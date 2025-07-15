module.exports = (req, res, next) => {
  const { productName, salary, description, category, quantity } = req.body;

  if (req.method === 'POST') {
    if (
      !productName ||
      salary === undefined ||
      !description ||
      !category ||
      quantity === undefined
    ) {
      return res.status(400).json({
        error: 'Missing required fields: productName, salary, description, category, or quantity'
      });
    }
  }

  if (req.method === 'PATCH') {
    if (
      productName === undefined &&
      salary === undefined &&
      description === undefined &&
      category === undefined &&
      quantity === undefined
    ) {
      return res.status(400).json({
        error: 'Please provide at least one field to update'
      });
    }
  }

  next();
};