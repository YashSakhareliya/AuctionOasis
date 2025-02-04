const path = require('path')
const {readFile} = require('../utils/fileHandler')
const itemFilePath = path.join(__dirname,'../files/items.json')
const Item = require('../models/itemModel')


const liveAuction =  async (req,res)=>{
    let items = await Item.find()
    res.render('live_auction', {items})
}

const liveAuctionFilter = (req, res) =>{
    items =  readFile(itemFilePath)
    console.log(req.body)
    const {categories, priceRange, statuses} = req.body
    // const filter = {categories, priceRange, statuses}
    // console.log(filter)

    // const filteredItems = items.filter(item => {item.categories.toLowerCase() === filter.categories.toLowerCase()})
    // console.log(filteredItems)

    res.render('live_auction',{items})
}

const renderItem = async (req, res, next) => {
    
    try{
        const itemId = req.params.itemId;

        // Validate the ObjectId
        // if (!mongoose.Types.ObjectId.isValid(itemId)) {
        //     return res.status(400).render('404', { error: 'Invalid Item ID' });
        // }

        let item = await Item.findOne({_id: itemId})
        if(!item){
            return res.status(404).send({error: 'Item not found'})
        }
        res.render('item_details',{item})
    }catch(err){
        return next(err)
    }

}

module.exports = {liveAuction, liveAuctionFilter, renderItem}