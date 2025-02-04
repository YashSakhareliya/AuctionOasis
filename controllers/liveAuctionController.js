const path = require('path')
const {readFile} = require('../utils/fileHandler')
const itemFilePath = path.join(__dirname,'../files/items.json')
const Item = require('../models/itemModel')


const liveAuction =  async (req,res)=>{
    try {
        const { categories, priceRange, statuses } = req.query;
        
        // Build filter object
        let filter = {};
        
        // Add category filter
        if (categories && categories !== '') {
            filter.categories = categories;
        }
        
        // Add price range filter
        if (priceRange && priceRange !== '') {
            const priceRanges = {
                'Under 2000': { $lt: 2000 },
                '2000 - 5000': { $gte: 2000, $lte: 5000 },
                '5000 - 10000': { $gte: 5000, $lte: 10000 }
            };
            
            if (priceRanges[priceRange]) {
                filter.currentBid = priceRanges[priceRange];
            }
        }
        
        // Add status filter
        if (statuses && statuses !== '') {
            const statusMap = {
                'Live Now': 'live',
                'Upcomming': 'upcoming',
                'Ended': 'ended'
            };
            filter.status = statusMap[statuses];
        }
        console.log(filter)
        // Get items with filters
        const items = await Item.find(filter)
            .sort({ createdAt: -1 })
            
        
        res.render('live_auction', { 
            items,
            selectedFilters: { categories, priceRange, statuses }
        });
    } catch (error) {
        next(error);
    }
}



const renderItem = async (req, res, next) => {
    try {
        const itemId = req.params.itemId;
        

        // Find item and populate seller and recent bids with user information
        const item = await Item.findOne({ _id: itemId })
            .populate('sellerId', 'name _id') // Get seller's name and ID
            .populate({
                path: 'recentBids',
                populate: { path: 'userId', select: 'name' }, // Populate userId with user's name
                options: { 
                    sort: { date: -1 },
                    limit: 10 // Limit to last 10 bids
                }
            });

        if (!item) {
            return res.status(404).render('error', { error: 'Item not found' });
        }
        console.log(item)

        // Add seller name to item for easy access in template
        item.sellerName = item.sellerId?.name;
        
        // Ensure currentBid exists
        item.currentBid = item.currentBid || item.startingBid;

        // Check if auction has ended
        const isExpired = new Date(item.timeRemaining) <= new Date();

        res.render('item_details', {
            item,
            isExpired
        });
    } catch (err) {
        console.error('Error rendering item:', err);
        return next(err);
    }
};

// update item expiry status
const updateExpiredItem = async (req, res, next) => {
    try {
        const { itemId } = req.params;
        
        const updatedItem = await Item.findByIdAndUpdate(
            itemId,
            { $set: { status: 'ended' } },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ success: true, item: updatedItem });
    } catch (error) {
        next(error);
    }
};

module.exports = {liveAuction, renderItem, updateExpiredItem}