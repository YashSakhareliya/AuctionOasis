const path = require('path')
const {readFile} = require('../utils/fileHandler')
const itemFilePath = path.join(__dirname,'../files/items.json')

const items =  readFile(itemFilePath)

const liveAuction =  (req,res)=>{
    res.render('live_auction', {items})
}

const liveAuctionFilter = (req, res) =>{
    console.log(req.body)
    const {categories, priceRange, statuses} = req.body
    // const filter = {categories, priceRange, statuses}
    // console.log(filter)

    // const filteredItems = items.filter(item => {item.categories.toLowerCase() === filter.categories.toLowerCase()})
    // console.log(filteredItems)

    res.render('live_auction',{items})
}

module.exports = {liveAuction, liveAuctionFilter}