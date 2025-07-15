const express = require('express');
const router = express.Router();
const validateProduct = require('../middleware/validateProduct');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', validateProduct, createProduct);
router.patch('/:id', validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;