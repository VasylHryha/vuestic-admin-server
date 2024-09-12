const express = require('express');
const router = express.Router();
const { getRootController } = require('../controllers/root');

router.get('/', getRootController);

module.exports = router;
