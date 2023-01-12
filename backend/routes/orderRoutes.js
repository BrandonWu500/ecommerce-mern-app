const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrders,
  getIncome,
  deleteAllOrders,
} = require('../controllers/orderController');
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require('../middleware/authMiddleware');

const router = require('express').Router();

router
  .route('/')
  .get(verifyTokenAndAdmin, getAllOrders)
  .delete(verifyTokenAndAdmin, deleteAllOrders);
router.route('/income').get(verifyTokenAndAdmin, getIncome);
router.route('/guest').post(createOrder);
router
  .route('/:id')
  .get(verifyTokenAndAuth, getUserOrders)
  .post(verifyTokenAndAuth, createOrder);
router
  .route('/:id/:orderId')
  .put(verifyTokenAndAuth, updateOrder)
  .delete(verifyTokenAndAuth, deleteOrder);

module.exports = router;
