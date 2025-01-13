const path = require('path')
const {readFile} = require('../utils/fileHandler')
const itemFilePath = path.join(__dirname,'../files/items.json')

const items =  readFile(itemFilePath)

const liveAuction =  (req,res)=>{
    res.render('live_auction', {items})
}

const liveAuctionFilter = (req, res) =>{
    console.log(req.body)
    res.render('live_auction',{items})
}

module.exports = {liveAuction, liveAuctionFilter}