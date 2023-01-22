const asyncHandler = require('express-async-handler');

const Cart = require('../models/cartModel');

const getCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
});

const addToCart = asyncHandler(async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    const product = req.body;
    console.log(cart);
    if (cart) {
      // check if item already in cart
      const itemIdx = cart.products.findIndex(
        (item) => item._id === product._id
      );

      // updates existing item's quantity
      if (itemIdx > -1) {
        const item = cart.products[itemIdx];
        item.quantity += product.quantity;
        cart.products[itemIdx] = item;
      } else {
        cart.products.push(product);
      }

      // updates total cart quantity and price
      cart.quantity += product.quantity;
      cart.totalPrice += product.price * product.quantity;
      cart = await cart.save();
      return res.status(201).json(cart);
    } else {
      const newCart = await Cart.create({
        user: req.user.id,
        products: [product],
        quantity: product.quantity,
        totalPrice: product.price * product.quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.log(error);
  }
});

// creates a new cart with multiple products
const addCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id });
  if (cart) {
    res.status(400);
    throw new Error('User already has cart');
  }
  const products = req.body.products;
  const quantity = req.body.quantity;
  const totalPrice = req.body.totalPrice;

  try {
    const newCart = await Cart.create({
      user: req.user.id,
      products,
      quantity,
      totalPrice,
    });
    return res.status(201).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  const itemId = req.params.itemId;
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    const itemIdx = cart.products.findIndex((item) => item._id === itemId);
    if (itemIdx > -1) {
      const item = cart.products[itemIdx];
      cart.totalPrice -= item.quantity * item.price;
      cart.quantity -= item.quantity;
      cart.products.splice(itemIdx, 1);
    }
    cart = await cart.save();
    return res.status(201).json(cart);
  } catch (error) {
    console.log(error);
  }
});

const updateCart = asyncHandler(async (req, res) => {
  const itemId = req.params.itemId;
  const { newQuantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    const itemIdx = cart.products.findIndex((item) => item._id === itemId);
    if (itemIdx > -1 && newQuantity > 0) {
      const item = cart.products[itemIdx];
      cart.quantity -= item.quantity;
      cart.totalPrice -= item.quantity * item.price;
      item.quantity = newQuantity;
      cart.products[itemIdx] = item;
      cart.quantity += newQuantity;
      cart.totalPrice += newQuantity * item.price;
    }
    cart = await cart.save();
    return res.status(201).json(cart);
  } catch (error) {
    console.log(error);
  }

  const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedCart);
});

const deleteCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    res.status(400);
    throw new Error('Cart not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (cart.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await cart.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCart,
  addToCart,
  addCart,
  removeFromCart,
  updateCart,
  deleteCart,
};
