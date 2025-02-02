const User = require('../models/userModel');
const renderWallet = async (req, res) => {
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
    res.render('wallet', {wallet:userWallet})
}
module.exports = { renderWallet }