const express = require('express');
const {sendOpt, verifyOtp} = require('../controllers/otpVerifyController')
const router =  express.Router()

router.post('/send',sendOpt);
router.post('/verify', verifyOtp);

module.exports = router