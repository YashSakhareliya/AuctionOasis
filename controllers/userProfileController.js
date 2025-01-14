const path = require('path');
const {readFile, writeFile} = require('../utils/fileHandler')

const userDetailsFilePath = path.join(__dirname, '../files/userDetails.json')

const renderUserProfile = (req, res) =>{
    let user = []
    let userDetails = readFile(userDetailsFilePath)
    user = userDetails.find(u=>u.username === req.params.user)
    console.log(user)
    if(user === undefined){
        user = []
    }
    
    res.render('profile', {user})
}

module.exports = {renderUserProfile}