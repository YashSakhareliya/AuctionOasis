const path = require('path');
const {readFile, writeFile} = require('../utils/fileHandler')
const User =  require('../models/userModel')

const userDetailsFilePath = path.join(__dirname, '../files/userDetails.json')

const renderUserProfile = async (req, res) =>{
    try{
        console.log(res.locals.username)
        console.log(req.params.user)
        if(res.locals.username !== req.params.user){
            return res.render('404')
        }
        let userDetails =  await User.findOne({username: res.locals.username})
        return res.render('profile', {user: userDetails})
    }catch(err){
        return res.status(500).send({error: err.message})
    }
}

module.exports = {renderUserProfile}