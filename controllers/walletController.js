
const renderWallet = (req, res) => {
    let availableBalance = 200;
    let transactionHistory = [
        { type: 'Deposit', date: '3/19/2024', amount: '+$5,000', status: 'completed' },
        { type: 'Withdraw', date: '3/20/2024', amount: '-$2,000', status: 'pending' }
    ]
    res.render('wallet', { availableBalance, transactionHistory});
}
module.exports = { renderWallet }