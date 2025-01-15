const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        default: 'Demo User',
        trim: true,
    },
    username:{
        type: String,
        required: [true,"Username is required"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"], 
        unique: true, 
        trim: true,
        lowercase: true, 
        validate: {
            validator: function (value) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: "Invalid email format", 
        },
    },
    password:{
        type: String,
        required: [true,"Password is required"],
    },
    profilePicture: {
        type: String,
        default: "/images/about-auctionoasis-logo/clock.png",
    },
    role: {
        type: String,
        enum: ["admin", "buyer"],
        default: "buyer",
    },
    bio: {
        type: String,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return /^\+?[0-9]{10,15}$/.test(value);
            },
            message: "Invalid phone number format",
        },
    },
    occupation: {
        type: String,
        trim: true,
    },
    birthdate: {
        type: Date, 
    },
    socialLinks: {
        instagram: { type: String, trim: true },
        twitter: { type: String, trim: true },
    },
    location: {
        type: String,
        trim: true,
    },
    wallet:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wallet",
        },
    ],
    myItems:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
        },
    ],
    bidHistory:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bid",
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

// Hooks
userSchema.pre("save", function (next){
    if(this.isModified()){
        this.updatedAt = Date.now();
    }
    next();
})

userSchema.pre("findOneAndUpdate",function (next){
    this.set({updatedAt: Date.now()});
    next();
})

const User = mongoose.model("User",userSchema);

module.exports = User;