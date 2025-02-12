const User = require('../models/userModel')
const Item = require('../models/itemModel')
const Bid = require('../models/bidModel')

const placeBid = async (req, res, next) => {
    try {
        const itemId = req.params.itemId;
        const userId = req.params.userId;

        console.log(itemId, userId)
        console.log('DOne ')

        // 1. Get item and user details
        const [item, user] = await Promise.all([
            Item.findById(itemId),
            User.findById(userId)
        ]);
        console.log(item, user)
        if (!item || !user) {
            req.flash('error', 'Item or User not found');
            return res.redirect(`/live/auction/item/${itemId}`);
        }
        console.log('DOne 1')

        // need imporvement of this section
        // need to solve error is user place bid on his placed item 
        // Check if user is bidding on their own item
        if (item.sellerId.toString() === userId) {
            req.flash('error', "you can't place bid on your item");
            return res.redirect(`/live/auction/item/${itemId}`);
        }
        console.log('DOne 2')


        // Check if item has expired
        if (new Date(item.timeRemaining) <= new Date()) {
            return res.status(400).render('error', { error: 'Auction has ended' });
        }

        // Calculate new bid amount (10% higher than current bid or starting bid)
        const currentAmount = item.currentBid || item.startingBid;
        const newBidAmount = Math.ceil(currentAmount * 1.1);

        console.log('DOne 3')

        // Validate bid amount
        if (newBidAmount <= currentAmount) {
            return res.status(400).render('error', { error: 'Bid must be at least 10% higher than current bid' });
        }

        // Set previous winning bid to false if exists
        // need to update
        await Bid.findOneAndUpdate(
            { itemId: item._id, isWinningBid: true },
            { isWinningBid: false }
        );

        // 2. Create new bid document
        const newBid = new Bid({
            amount: newBidAmount,
            itemId: item._id,
            userId: user._id,
            date: new Date(),
            isWinningBid: true // This will be the current highest bid
        });
        const savedBid = await newBid.save();
        
        

        

        // 3. Update user's bidHistory
        await User.findByIdAndUpdate(userId, {
            $push: { bidHistory: savedBid._id }
        });

        // 4. Update item's recentBids and currentBid
        await Item.findByIdAndUpdate(itemId, {
            $push: { recentBids: savedBid._id },
            currentBid: newBidAmount
        });

        // 5. Redirect to item details page
        res.redirect(`/live/auction/item/${itemId}`);

    } catch (err) {
        // Log the error for debugging
        console.error('Bid placement error:', err);
        return next(err);
    }
};

module.exports = { placeBid };