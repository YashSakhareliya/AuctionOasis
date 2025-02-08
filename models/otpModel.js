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

module.exports = mongoose.model('Otp', otpScheme)