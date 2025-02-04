const User = require('../models/userModel')
const Item = require('../models/itemModel')
const Bid = require('../models/bidModel')

const placeBid = async (req, res, next) => {
    try{
        const itemId = req.params.itemId;
        const userId = req.params.userId;

        console.log(itemId)
        console.log(userId)
        // for current purpose i add new bid money add 500 rupees in current bid amount

        // 1. Get item and user details
        const [item, user] = await Promise.all([
            Item.findById(itemId),
            User.findById(userId)
        ]);

        if (!item || !user) {
            return res.status(404).json({ error: 'Item or User not found' });
        }

         // Check if item has expired
         if (new Date(item.timeRemaining) <= new Date()) {
            return res.status(400).json({ error: 'Auction has ended' });
        }

         // Calculate new bid amount (10% higher than current bid or starting bid)
         const currentAmount = item.currentBid || item.startingBid;
         const newBidAmount = Math.ceil(currentAmount * 1.1);
 
        // 2. Create new bid document
        const newBid = new Bid({
            amount: newBidAmount,
            itemId: item._id,
            userId: user._id,
            date: new Date(),
            isWinningBid: true // This will be the current highest bid
        });

         // Set previous winning bid to false if exists
         await Bid.findOneAndUpdate(
            { itemId: item._id, isWinningBid: true },
            { isWinningBid: false }
        );

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

    }catch(err){
        return next(err)
    }
}

module.exports = { placeBid };