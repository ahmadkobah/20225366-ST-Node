const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());


const PRODUCTS_PATH = path.join(__dirname, 'product.json');


app.get('/products', async (req, res) => {
  const data = await fs.readFile(PRODUCTS_PATH, 'utf8');
  const json = JSON.parse(data);
  res.json(json.products);
});


app.get('/products/:id', async (req, res) => {
  const data = await fs.readFile(PRODUCTS_PATH, 'utf8');
  const json = JSON.parse(data);
  const product = json.products.find(p => String(p.id) === req.params.id);
  product ? res.json(product) : res.status(404).send('Product not found');
});


app.post('/products', async (req, res) => {
  const newProduct = req.body;
  const data = await fs.readFile(PRODUCTS_PATH, 'utf8');
  const json = JSON.parse(data);

  json.products.push(newProduct);
  await fs.writeFile(PRODUCTS_PATH, JSON.stringify(json, null, 2));
  res.status(201).send('Product added');
});


app.put('/products/:id', async (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  const data = await fs.readFile(PRODUCTS_PATH, 'utf8');
  const json = JSON.parse(data);

  const index = json.products.findIndex(p => String(p.id) === id);
  if (index !== -1) {
    json.products[index] = { ...json.products[index], ...updatedProduct };
    await fs.writeFile(PRODUCTS_PATH, JSON.stringify(json, null, 2));
    res.send('Product updated');
  } else {
    res.status(404).send('Product not found');
  }
});


app.delete('/products/:id', async (req, res) => {
  const id = req.params.id;
  const data = await fs.readFile(PRODUCTS_PATH, 'utf8');
  const json = JSON.parse(data);

  const filtered = json.products.filter(p => String(p.id) !== id);
  json.products = filtered;
  await fs.writeFile(PRODUCTS_PATH, JSON.stringify(json, null, 2));
  res.send('Product deleted');
});

app.listen(4000, () => {
  console.log('CRUD API running on http://localhost:4000');
});