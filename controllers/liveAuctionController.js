const path = require('path')
const {readFile} = require('../utils/fileHandler')
const itemFilePath = path.join(__dirname,'../files/items.json')
const liveAuction =  (req,res)=>{
   const items = readFile(itemFilePath)
    res.render('live_auction', {items})
}

module.exports = {liveAuction}