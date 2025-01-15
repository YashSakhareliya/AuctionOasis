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

const renderItem = (req, res) => {
    let item = [];
    console.log(req.params.itemId)

    items = readFile(itemFilePath)
    item = items.find(item => item.itemId === req.params.itemId)
    res.render('item_details',{item})

}

module.exports = {liveAuction, liveAuctionFilter, renderItem}