const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 6000;
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const cors = require('cors');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', checkoutRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend server running on port ${port}!`);
});
