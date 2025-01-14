

const renderUserProfile = (req, res) =>{
    const user = []
    console.log(req.params.user)
    
    res.render('profile', {user})
}

module.exports = {renderUserProfile}