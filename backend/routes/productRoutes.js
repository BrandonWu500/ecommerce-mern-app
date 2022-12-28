const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require('../controllers/productController');
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} = require('../middleware/authMiddleware');
const router = require('express').Router();

router
  .route('/')
  .post(verifyTokenAndAdmin, createProduct)
  .get(verifyTokenAndAuth, getAllProducts);
router
  .route('/:id')
  .put(verifyTokenAndAdmin, updateProduct)
  .delete(verifyTokenAndAdmin, deleteProduct)
  .get(verifyTokenAndAuth, getProduct);

module.exports = router;
