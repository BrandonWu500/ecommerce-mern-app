const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const verifyToken = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const verifyTokenAndAuth = asyncHandler(async (req, res, next) => {
  await verifyToken(req, res, () => {
    if (!req.user) {
      res.status(400);
      throw new Error('No user associated with token');
    }
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403);
      throw new Error("You don't have permission to do that");
    }
  });
});

const verifyTokenAndAdmin = asyncHandler(async (req, res, next) => {
  await verifyToken(req, res, () => {
    if (!req.user) {
      res.status(400);
      throw new Error('No user associated with token');
    }
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403);
      throw new Error("You don't have permission to do that");
    }
  });
});

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
