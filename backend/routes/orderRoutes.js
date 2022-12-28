const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrders,
  getIncome,
} = require('../controllers/orderController');
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require('../middleware/authMiddleware');

const router = require('express').Router();

router
  .route('/')
  .post(verifyTokenAndAuth, createOrder)
  .get(verifyTokenAndAdmin, getAllOrders);
router.route('/income').get(verifyTokenAndAdmin, getIncome);
router
  .route('/:id')
  .put(verifyTokenAndAuth, updateOrder)
  .delete(verifyTokenAndAuth, deleteOrder);
router.route('/:userId').get(verifyTokenAndAuth, getUserOrders);

module.exports = router;
