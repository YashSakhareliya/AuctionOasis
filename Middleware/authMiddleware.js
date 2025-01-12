const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    const token = req.cookies.auth_token

    if(!token){
        res.locals.isAuthenticated = false
        return next()
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        res.locals.isAuthenticated = true
        res.locals.username = decoded.username
        next()
    }catch(err){
        res.locals.isAuthenticated = false
        return next()
    }
}

const ensureAuthenticated = (req, res, next) => {
    if (!res.locals.isAuthenticated) {
      return res.redirect('/auth/login');
    }
    next();
};


module.exports = {verifyToken, ensureAuthenticated};