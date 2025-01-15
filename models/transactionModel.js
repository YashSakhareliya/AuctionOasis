const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    bidderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    walletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserWallet',
        required: true,
    },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal'], 
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Transaction amount cannot be negative'], 
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'], 
        required: true,
        default: 'pending',
    },
    way: {
        type: String,
        required: true,
        trim: true,
    },
});


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
