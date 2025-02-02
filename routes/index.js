const express = require('express');
const { renderIndex, renderWallet } = require('../controllers/indexController');
const { ensureAuthenticated } = require('../Middleware/authMiddleware')

const router = express.Router();

router.get('/', renderIndex);


module.exports = router;
