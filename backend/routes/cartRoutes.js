const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
} = require('../controllers/cartController');
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require('../middleware/authMiddleware');

const router = require('express').Router();

router
  .route('/')
  .post(verifyTokenAndAuth, createCart)
  .get(verifyTokenAndAdmin, getAllCarts);
router
  .route('/:id')
  .put(verifyTokenAndAuth, updateCart)
  .delete(verifyTokenAndAuth, deleteCart);
router.route('/:userId').get(verifyTokenAndAuth, getCart);

module.exports = router;
