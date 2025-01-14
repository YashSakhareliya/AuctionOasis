const jwt = require('jsonwebtoken');
const path = require('path');
const { readFile, writeFile } = require('../utils/fileHandler');

const loginFilePath = path.join(__dirname, '../files/login.json');
const registeruserFilePath = path.join(__dirname, '../files/registeruser.json');

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
    return res.send('Passwords do not match');
  }

  const registeredUser  = readFile(registeruserFilePath)

  const existUser = registeredUser.some(user=>user.username === newUser.username)

  if(existUser){
    return res.send('Username already exists');
  }else{
    registeredUser.push(newUser)
    writeFile(registeruserFilePath, registeredUser)
    res.render('auth/login', { title: 'Login' });
  }

  console.log({ username, email, password });
  res.redirect('auth/login');
};

const signOut = (req, res) => {
  res.clearCookie('auth_token');
  res.redirect('/auth/login');
};

module.exports = { renderLogin, loginUser, renderRegister, registerUser, signOut };
