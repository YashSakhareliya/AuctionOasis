const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const UserWallet = require('../models/userWalletModel')


// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

const renderLogin = (req, res) => {
  res.render('auth/login', { title: 'Login', messages: req.flash() });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const loginUser = { username, password };
  if (!username || !password) {
    req.flash('error', 'Please enter both username and password');
    return res.redirect('/auth/login');
  }

  const isUserExist = await User.findOne({username: loginUser.username})
  if(!isUserExist) {
    req.flash('error', 'Username Not Found');
    return res.redirect('/auth/login');
  }
  // match password
  
  bcrypt.compare(loginUser.password, isUserExist.password, function(err, result) {
    if(err){
      res.status(500).json({status: err.message});
    }
    if(result){
      // Create JWT token
      let userId = isUserExist._id
      const token = jwt.sign({userId, username}, JWT_SECRET, {expiresIn: '1d'})
      
      // set cookie
      res.cookie('auth_token',token,{httpOnly: true, secure: true})

      res.locals.username = loginUser.username
      res.locals.userId = userId
      res.redirect('/');
      
    }else{
      res.send('Invalid Password');
    }
  });
  
};

const renderRegister = (req, res) => {
  res.render('auth/register', { title: 'Register' });
};

const registerUser = async (req, res) => {
  const { username, email, password, conformpassword } = req.body;
  const newUser = { username, email, password}

  if (password !== conformpassword) {
    return res.send("Password and conform password dose not match");
  }

  const saltRounds = 10;
  try{
   
    // check username is not already registered
    let usernameExist =await User.findOne({username:newUser.username})
    
    let emailExist = await User.findOne({email:newUser.email})
    if(usernameExist) {
      return res.send("Username is already taken");
    }
    if(emailExist) {
      return res.send("Email is already taken");
    }
    // create user wallet 
    let newUserWallet = new UserWallet({
      username: newUser.username,
      email: newUser.email,
      availableAmount: 0
    })
    await newUserWallet.save()

    bcrypt.hash(password, saltRounds,async function(err,hashPassword) {
      if (err) return res.status(err).json({status:err.message});

      const userToSave = new User({
        username: newUser.username,
        email: newUser.email,
        password: hashPassword,
        wallet: newUserWallet._id
      })

      const savedUser = await userToSave.save()
      res.render('auth/login')

  });
  }catch(err){
    res.status(500).json({status:err.message})
  }
  
};



const signOut = (req, res) => {
  res.clearCookie('auth_token');
  res.redirect('/auth/login');
};

module.exports = { renderLogin, loginUser, renderRegister, registerUser, signOut };
