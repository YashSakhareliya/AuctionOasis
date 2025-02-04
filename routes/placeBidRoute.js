const express = require('express');
const { ensureAuthenticated } = require('../Middleware/authMiddleware');
const { placeBid } = require('../controllers/placeBidController');

const router = express.Router()

router.post('/place/:itemId/:userId',ensureAuthenticated, placeBid)
module.exports = router