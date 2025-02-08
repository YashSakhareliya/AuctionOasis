const User = require('../models/userModel');
const Otp = require('../models/otpModel')
require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = require('../config/emailConfig');

const sendOtp = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    
    const user = await User.findOne({ email: email })

    if (user) {
        return res.status(400).json({ success: false, message: "Email already registered!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in MongoDB (or update if exists)
    await Otp.findOneAndUpdate(
        { email },
        { otp, createdAt: new Date() },
        { upsert: true }
    );

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your AuctionOasis OTP",
        text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });
    res.json({ success: true, message: "OTP sent to email!" });
}

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp) {
        return res.status(400).json({ success: false, message: "Invalid OTP or expired" });
    }

    // Delete OTP after successful verification
    await Otp.deleteOne({ email });

    res.json({ success: true, message: "OTP verified" });
}

module.exports = {sendOtp, verifyOtp}