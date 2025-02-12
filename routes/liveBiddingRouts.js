const express = require('express');
const {liveBiddingItems} = require('../controllers/liveBiddingController')
const router = express.Router();
const { ensureAuthenticated } = require('../Middleware/authMiddleware');
// live bidding
router.get('/:userId', ensureAuthenticated, liveBiddingItems)

module.exports = router
