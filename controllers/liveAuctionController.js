const path = require('path')
const {readFile} = require('../utils/fileHandler')
const itemFilePath = path.join(__dirname,'../files/items.json')

const liveAuction = async (req,res)=>{
   const items = await readFile(itemFilePath)
    res.render('live_auction', {items})
}

module.exports = {liveAuction}