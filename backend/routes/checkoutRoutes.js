const { createPayment } = require('../controllers/checkoutController');

const router = require('express').Router();

router.post('/payment', createPayment);

module.exports = router;
