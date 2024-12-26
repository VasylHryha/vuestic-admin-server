const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const rootRoutes = require('./root');
const stripeApi = require('./stripe');

router.use('/users', userRoutes);
router.use('/', rootRoutes);
router.use('/api', stripeApi);


module.exports = router;
