const express = require('express')
const { liveAuction, liveAuctionFilter, renderItem } = require('../controllers/liveAuctionController')
const { ensureAuthenticated } = require('../Middleware/authMiddleware')
const router =  express.Router()

router.get('/auction',ensureAuthenticated, liveAuction)

router.post('/auction',ensureAuthenticated, liveAuctionFilter)

router.get('/auction/item/:itemId',ensureAuthenticated, renderItem)

module.exports = router