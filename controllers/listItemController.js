const Item = require('../models/itemModel')
const User = require('../models/userModel')

const listNewItem = async (req, res, next) => {
    try {
        // Check if user is authorized
        if (res.locals.userId !== req.params.userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const itemDetails = req.body;
        const itemImageUrl = req.file ? req.file.path : null;
        const userId = req.params.userId;

        // Set current bid equal to starting bid initially
        itemDetails.currentBid = itemDetails.startingBid;
        itemDetails.image = itemImageUrl;
        console.log(itemDetails.image)
        // Create new item
        const newItem = new Item({
            name: itemDetails.name,
            description: itemDetails.description,
            sellerName: itemDetails.sellerName,
            sellerId: userId,
            categories: itemDetails.categories,
            image: itemDetails.image,
            startingBid: itemDetails.startingBid,
            currentBid: itemDetails.currentBid,
            timeRemaining: itemDetails.timeRemaining,
            status: 'live'
        });

        // Save item to database
        await newItem.save();

        // Update user's items array
        await User.findByIdAndUpdate(
            userId,
            { $push: { myItems: newItem._id } }
        );

        res.redirect(`/profile/${res.locals.username}`);
    } catch (error) {
        console.error('Error listing item:', error);
        next(error);
    }
}

module.exports = { listNewItem };