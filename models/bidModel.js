const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: [0, 'Bid amount cannot be negative'],
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isWinningBid: {
        type: Boolean,
        default: false,
    },
    
});


bidSchema.pre('save', function (next) {
   
    if (this.amount <= 0) {
        return next(new Error('Bid amount must be greater than zero.'));
    }
    next();
});


bidSchema.index({ itemId: 1, amount: -1 });

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
