const express = require('express');
const {liveBiddingItems, renderLiveBiddingPage} = require('../controllers/liveBiddingController')
const router = express.Router();
const { ensureAuthenticated } = require('../Middleware/authMiddleware');
// live bidding
router.post('/:userId', ensureAuthenticated, liveBiddingItems)
router.get('/:userId', ensureAuthenticated, renderLiveBiddingPage)

module.exports = router
