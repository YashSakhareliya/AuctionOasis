const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const otpScheme = mongoose.Schema({
    email:{
        type:String,
        require: true,
        unique: true
    },
    otp: {
        type: String,
        require: true

    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300,
    },
})

const Otp = mongoose.model('Otp', otpScheme)

module.exports = Otp;