const path = require('path');
const { readFile, writeFile } = require('../utils/fileHandler')
const User = require('../models/userModel')

const userDetailsFilePath = path.join(__dirname, '../files/userDetails.json')

const renderUserProfile = async (req, res, next) => {
    try {
        console.log(res.locals.username)
        console.log(req.params.user)
        if (res.locals.username !== req.params.user) {
            return res.render('404')
        }
        let userDetails = await User.findOne({ username: res.locals.username })
            .populate({
                path: 'myItems',
                model: 'Item',
            })
            .populate({
                path: 'bidHistory',
                model: 'Bid',
                populate: { path: 'itemId', select: 'name' },
                options: { 
                    sort: { date: -1 },
                } 
            })
            
        return res.render('profile', { user: userDetails })
    } catch (err) {
        return next(err)
    }
}

const updateUserProfile = async (req, res, next) => {
    try {
        if (res.locals.userId !== req.params.userId) {
            return res.render('404')
        }
        const userId = req.params.userId

        let updatedUserDetails = { ...req.body }
        let profileImageUrl = req.file ? req.file.path : null;

        // Separate socialLinks fields
        const socialLinksFields = ["twitter", "instagram"];
        let socialLinks = {};

        // Filter out empty string values ("") from main fields
        updatedUserDetails = Object.fromEntries(
            Object.entries(updatedUserDetails)
                .filter(([key, value]) => value.trim() !== "" && !socialLinksFields.includes(key))
        );

        // Filter out empty values for socialLinks separately
        socialLinks = Object.fromEntries(
            Object.entries(req.body)
                .filter(([key, value]) => socialLinksFields.includes(key) && value.trim() !== "")
        );

        // Add socialLinks only if there are valid values
        if (Object.keys(socialLinks).length > 0) {
            updatedUserDetails.socialLinks = socialLinks;
        }
        // check image is not null
        if(profileImageUrl){
            updatedUserDetails.profilePicture = profileImageUrl;
        }
        
        const updateduser = await User.findByIdAndUpdate(
            userId,
            { $set: updatedUserDetails }, // Only update non-empty fields
            { new: true, runValidators: true, upsert: false}
        );
        
        res.redirect(`/profile/${updateduser.username}`)
    } catch (err) {
        return next(err)
    }
}

module.exports = { renderUserProfile, updateUserProfile }