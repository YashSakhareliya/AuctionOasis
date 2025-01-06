require('dotenv').config()
const { render } = require('ejs')
const express = require('express')
const bodyParser = require("body-parser");
const path = require('path')


const app = express()
const port = process.env.PORT


app.use(express.static(path.join(__dirname, 'public')));   // for all css and javascript files
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')   // told to express my frontend is in EJS file


app.get('/', (req, res) => {
  res.render('index')
})


app.get('/login', (req, res) => {
    res.render('auth/login')
})

app.post('/login', (req, res) => {
  const {username , password} = req.body
  console.log(username, password)
  res.render('index')
})


app.get('/signout', (req, res) => {
  res.render('auth/login')
})


app.listen(port, () => {
  console.log(`Example app listening localhost:${port}`)
})