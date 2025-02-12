const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    sellerName: {
        type: String,
        required: true,
        trim: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    categories: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        default: 'default-item.jpg', 
    },
    startingBid: {
        type: Number,
        required: true,
        min: [0, 'Starting bid cannot be negative'],
    },
    currentBid: {
        type: Number,
        default: 0, 
    },
    timeRemaining: {
        type: Date, 
        required: true,
    },
    status: {
        type: String,
        enum: ['live', 'active', 'ended'], 
        default: 'live',
    },
    recentBids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bid', 
        },
    ],
    userLikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


itemSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


itemSchema.index({ name: 1, categories: 1 });
itemSchema.index({name: "text", description: "text"});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
