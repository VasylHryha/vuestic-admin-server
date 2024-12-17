const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const rootRoutes = require('./root');
const checkoutSession = require('./checkout-sesssion')
const stripeApi = require('./stripe');

router.use('/users', userRoutes);
router.use('/', rootRoutes);
router.use('/api/checkout', checkoutSession);
router.use('/api', stripeApi);


module.exports = router;
