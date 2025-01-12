const express = require('express');
const { renderIndex } = require('../controllers/indexController');

const router = express.Router();

router.get('/', renderIndex);

module.exports = router;
