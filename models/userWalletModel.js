const mongoose = require('mongoose');


const userWalletSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                // Simple regex for email validation
                return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`,
        },
    },
    availableAmount: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Available amount cannot be negative'],
    },
    transactionHistory: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Transaction', 
        },
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

userWalletSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


const UserWallet = mongoose.model('Wallet', userWalletSchema);

module.exports = UserWallet;
