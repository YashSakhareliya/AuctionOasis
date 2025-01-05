require('dotenv').config()
const express = require('express')
const path = require('path')


const app = express()
const port = process.env.PORT


app.use(express.static(path.join(__dirname, 'public')));   // for all css and javascript files
app.set('view engine', 'ejs')   // told to express my frontend is in EJS file


app.get('/login', (req, res) => {
    res.render('auth/login')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening localhost:${port}`)
})