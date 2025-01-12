const path = require('path');
const { readFile, writeFile } = require('../utils/fileHandler');

const loginFilePath = path.join(__dirname, '../files/login.json');

const renderLogin = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.send('Please enter both username and password');
  }

  const user = { username, password };
  let data = readFile(loginFilePath);

  data.push(user);

  writeFile(loginFilePath, data);
  res.render('index', { title: 'Home' });
};

const renderRegister = (req, res) => {
  res.render('auth/register', { title: 'Register' });
};

const registerUser = (req, res) => {
  const { username, email, password, conformpassword } = req.body;

  if (password !== conformpassword) {
    return res.send('Passwords do not match');
  }

  console.log({ username, email, password });
  res.render('auth/login', { title: 'Login' });
};

const signOut = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

module.exports = { renderLogin, loginUser, renderRegister, registerUser, signOut };
