const User = require('../models/userModel');
const renderWallet = async (req, res, next) => {
    try {
        
        if (res.locals.userId != req.params.userId) {
            return res.redirect('/profile/' + res.locals.username)
        }
        const user = await User.findOne({ _id: req.params.userId })
            .populate({
                path: "wallet",
                populate: {
                    path: "transactionHistory",
                    model: "Transaction",
                },
            });
        const userWallet = user.wallet[0]
        const userTransaction = userWallet.transactionHistory
        res.render('wallet', { wallet: userWallet,  messages: req.flash()  })

    } catch (error) {
        next(error)
    }

}
module.exports = { renderWallet }