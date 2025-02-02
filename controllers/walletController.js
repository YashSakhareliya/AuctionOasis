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
    const userWallet = user.wallet
    const userTransaction = user.transactionHistory
    console.log(userTransaction);
    res.json(user);
}
module.exports = { renderWallet }