const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');
const { readFile, writeFile } = require('../utils/fileHandler');
const { newUserStoreDetails } = require('../utils/newUserStoreDetails');
const User = require('../models/userModel')

const loginFilePath = path.join(__dirname, '../files/login.json');
const registeruserFilePath = path.join(__dirname, '../files/registeruser.json');
const newUserStoreDetailsFilePath = path.join(__dirname, '../files/userDetails.json');

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

const renderLogin = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  const loginUser = { username, password };
  if (!username || !password) {
    return res.send('Please enter both username and password');
  }

  let userData = readFile(registeruserFilePath)
  let loginUserExist = userData.find(user=>user.username === loginUser.username);

  if (!loginUserExist) {
    return res.send('User does not exist');
  }else{

    if(loginUserExist.password === loginUser.password){

      // Generate JWT
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

      // Set token in a secure cookie
      res.cookie('auth_token', token, { httpOnly: true, secure: true });

      let data = readFile(loginFilePath);

      data.push(loginUser);

      writeFile(loginFilePath, data);

      res.locals.username = loginUser.username;
      console.log(loginUser.username)
      return res.redirect('/');
    }else{
      res.send('Invalid password');
    }
  }
  
};

const renderRegister = (req, res) => {
  res.render('auth/register', { title: 'Register' });
};

const registerUser = (req, res) => {
  const { username, email, password, conformpassword } = req.body;
  const newUser = { username, email, password}

  if (password !== conformpassword) {
    return res.status(403).json({status: "Password and conform password dose not match"});
  }

  const saltRounds = 10;
  try{
    bcrypt.hash(password, saltRounds,async function(err,hashPassword) {
      if (err) return res.status(err).json({status:err.message});

      const userToSave = new User({
        username: newUser.username,
        email: newUser.email,
        password: hashPassword
      })

      const savedUser = await userToSave.save()
      res.status(200).json(savedUser)

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
