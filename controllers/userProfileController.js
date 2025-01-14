

const renderUserProfile = (req, res) =>{
    res.render('profile', {title: 'User Profile'})
}

module.exports = {renderUserProfile}