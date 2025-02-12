 const User = require('../models/userModel')
 const liveBiddingItems = async (req, res, next) => {
    
    const userId = req.params.userId;
    try{
        if(userId !== res.locals.userId){
            req.flash('error', 'You are not authorized to access this page');
            return res.redirect('/');
        }
    
        const user =await User.findById(userId)
        .populate({
            path: 'registeredItems',
            model: 'Item',
        })
        
        res.status(200).json({ items: user.registeredItems })
    }
    catch(err){
        return next(err)
    }
 }

 const renderLiveBiddingPage = (req, res, next) => {
     res.render('liveBidding', { title: 'Live Bidding' });
 }
 module.exports = {liveBiddingItems, renderLiveBiddingPage};