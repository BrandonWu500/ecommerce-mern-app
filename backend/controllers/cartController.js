const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');

//CREATE
const createCart = asyncHandler(async (req, res) => {
  // checks if cart for user already exists
  const oldCart = await Cart.findOne({ userId: req.body.userId });
  if (oldCart) {
    res.status(400);
    throw new Error('User already has a cart');
  }

  try {
    const cart = await Cart.create(req.body);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

//UPDATE
const updateCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    res.status(400);
    throw new Error('Cart not found');
  }
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

//DELETE
const deleteCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findByIdAndDelete(req.params.id);
  if (!cart) {
    res.status(400);
    throw new Error('Cart not found');
  }
  try {
    const { userId } = cart;
    await cart.remove();
    res.status(200).json(`Cart belonging to user ${userId} has been deleted`);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

//GET USER CART
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  if (!cart) {
    res.status(400);
    throw new Error('Cart not found');
  }
  res.status(200).json(cart);
});

//GET ALL CARTS (admin only)
const getAllCarts = asyncHandler(async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { createCart, updateCart, deleteCart, getCart, getAllCarts };
