const express = require('express')
const { liveAuction, renderItem, updateExpiredItem } = require('../controllers/liveAuctionController')
const { ensureAuthenticated } = require('../Middleware/authMiddleware')
const router =  express.Router()

router.get('/auction',ensureAuthenticated, liveAuction)


router.get('/auction/item/:itemId',ensureAuthenticated, renderItem)

// New route for updating expired items
router.put('/auction/item/:itemId/expire', ensureAuthenticated, updateExpiredItem);

module.exports = router