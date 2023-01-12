const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

//CREATE (admin only)
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product(req.body);

  try {
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

//UPDATE (admin only)
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error('Product not found');
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

//DELETE (admin only)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error('Product not found');
  }
  try {
    const { title } = product;
    await product.remove();
    res.status(200).json(`Product ${title} has been deleted`);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

//GET PRODUCT
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error('Product not found');
  }
  res.status(200).json(product);
});

//GET ALL PRODUCTS
const getAllProducts = asyncHandler(async (req, res) => {
  const qNew = req.query.new;
  const qCat = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCat) {
      products = await Product.find({
        categories: {
          $in: [qCat],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const search3Products = asyncHandler(async (req, res) => {
  // text search on query using logical AND
  const products = await Product.find({
    $text: { $search: `\"${req.body.query}\"` },
  }).limit(3);
  res.status(200).json(products);
});
const searchProducts = asyncHandler(async (req, res) => {
  // text search on query using logical AND
  const products = await Product.find({
    $text: { $search: `\"${req.body.query}\"` },
  });

  res.status(200).json(products);
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  searchProducts,
  search3Products,
};
