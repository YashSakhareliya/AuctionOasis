const express = require('express')
const { liveAuction } = require('../controllers/liveAuctionController')
const { ensureAuthenticated } = require('../Middleware/authMiddleware')
const router =  express.Router()

router.get('/auction',ensureAuthenticated, liveAuction)

module.exports = router