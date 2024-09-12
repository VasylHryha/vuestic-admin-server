const express = require('express');
const router = express.Router();
const { getRoot } = require('../controllers/root');

router.get('/', getRoot);

module.exports = router;
