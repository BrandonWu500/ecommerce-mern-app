const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

//CREATE
const createOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    res.status(400);
    throw new Error('Order not found');
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    res.status(400);
    throw new Error('Order not found');
  }

  try {
    const { _id } = order;
    await order.remove();
    res.status(200).json(`Order ${_id} has been deleted`);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE ALL ORDERS
const deleteAllOrders = asyncHandler(async (req, res) => {
  try {
    await Order.deleteMany({});
    res.status(200).json('All orders deleted');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET ORDER
const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL ORDERS
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET MONTHLY INCOME
const getIncome = asyncHandler(async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  deleteAllOrders,
  getUserOrders,
  getAllOrders,
  getIncome,
};
