const fs = require('fs').promises;
const path = require('path');
const dataPath = path.join(__dirname, '..', 'dev', 'products.json');

const readData = async () => {
  const data = await fs.readFile(dataPath, 'utf-8');
  return JSON.parse(data);
};

const writeData = async (data) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};

exports.getAllProducts = async (req, res) => {
  try {
    const { products } = await readData();
    res.status(200).json(products);
  } catch {
    res.status(500).json({ error: 'Failed to load products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { products } = await readData();
    const product = products.find(p => p.id === +req.params.id);
    product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
  } catch {
    res.status(500).json({ error: 'Failed to load product' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const data = await readData();
    const newProduct = {
      id: Date.now(),
      productName: req.body.productName,
      salary: req.body.salary,
      description: req.body.description,
      category: req.body.category,
      quantity: req.body.quantity
    };
    data.products.push(newProduct);
    await writeData(data);
    res.status(201).json(newProduct);
  } catch {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const data = await readData();
    const index = data.products.findIndex(p => p.id === +req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });

    data.products[index] = { ...data.products[index], ...req.body };
    await writeData(data);
    res.json(data.products[index]);
  } catch {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const data = await readData();
    const filtered = data.products.filter(p => p.id !== +req.params.id);
    if (filtered.length === data.products.length) return res.status(404).json({ error: 'Product not found' });

    data.products = filtered;
    await writeData(data);
    res.json({ message: 'Product deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};