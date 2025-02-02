const express = require('express');
const { ensureAuthenticated } = require('../Middleware/authMiddleware')
const { renderWallet } = require('../controllers/walletController');

const router =  express.Router();

router.get('/:userId',ensureAuthenticated, renderWallet);

module.exports = router;