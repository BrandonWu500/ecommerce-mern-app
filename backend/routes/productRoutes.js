const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  searchProducts,
  search3Products,
} = require('../controllers/productController');
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} = require('../middleware/authMiddleware');
const router = require('express').Router();

router.route('/').post(verifyTokenAndAdmin, createProduct).get(getAllProducts);
router.route('/search3').post(search3Products);
router.route('/search').post(searchProducts);
router
  .route('/:id')
  .put(verifyTokenAndAdmin, updateProduct)
  .delete(verifyTokenAndAdmin, deleteProduct)
  .get(getProduct);

module.exports = router;
