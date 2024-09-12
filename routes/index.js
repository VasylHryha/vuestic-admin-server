const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const rootRoutes = require('./root');

router.use('/users', userRoutes);
router.use('/', rootRoutes);

module.exports = router;
