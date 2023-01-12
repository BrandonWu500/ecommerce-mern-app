const {
  updateCart,
  deleteCart,
  getCart,
  addToCart,
  removeFromCart,
} = require('../controllers/cartController');
const { verifyTokenAndAuth } = require('../middleware/authMiddleware');

const router = require('express').Router();

router
  .route('/:id')
  .post(verifyTokenAndAuth, addToCart)
  .get(verifyTokenAndAuth, getCart)
  .delete(verifyTokenAndAuth, deleteCart);

router
  .route('/:id/:itemId')
  .delete(verifyTokenAndAuth, removeFromCart)
  .put(verifyTokenAndAuth, updateCart);

module.exports = router;
