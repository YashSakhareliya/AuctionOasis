const path = require('path');
const { readFile, writeFile } = require('../utils/fileHandler');

const loginFilePath = path.join(__dirname, '../files/login.json');
const registeruserFilePath = path.join(__dirname, '../files/registeruser.json');

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

  const registerUser  = readFile(registeruserFilePath)

  const existUser = registerUser.some(user=>user.username === newUser.username)

  if(existUser){
    return res.send('Username already exists');
  }else{
    registerUser.push(newUser)
    writeFile(registeruserFilePath, registerUser)
    res.render('auth/login', { title: 'Login' });
  }

  console.log({ username, email, password });
  res.render('auth/login', { title: 'Login' });
};

const signOut = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

module.exports = { renderLogin, loginUser, renderRegister, registerUser, signOut };
