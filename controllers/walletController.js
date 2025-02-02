const User = require('../models/userModel');
const renderWallet = async (req, res) => {
    const userwallet = await User.findOne({ _id: req.params.userId }).select('wallet').populate('wallet');
    
    res.json(userwallet.wallet);
}
module.exports = { renderWallet }