const express = require('express')
const { liveAuction, liveAuctionFilter } = require('../controllers/liveAuctionController')
const { ensureAuthenticated } = require('../Middleware/authMiddleware')
const router =  express.Router()

router.get('/auction',ensureAuthenticated, liveAuction)

router.post('/auction',ensureAuthenticated, liveAuctionFilter)

module.exports = router