const express = require('express');
const router = express.Router();
const { getRootController } = require('../controllers/root');
const getTypesController = require('../controllers/getTypes');

router.get('/', getRootController);
router.get('/get-types', getTypesController);

module.exports = router;
