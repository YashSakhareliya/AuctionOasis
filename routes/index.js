const express = require('express');
const { renderIndex, renderWallet } = require('../controllers/indexController');

const router = express.Router();

router.get('/', renderIndex);

router.get('/wallet', renderWallet);

module.exports = router;
