const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3500;
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const rootRoutes = require('./routes/rootRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

connectDB();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', rootRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', checkoutRoutes);

console.log(process.env.NODE_ENV);
/* // serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
} */

app.use(errorHandler);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}!`);
});
