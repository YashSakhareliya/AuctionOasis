require('dotenv').config()
const { render } = require('ejs')
const express = require('express')
const bodyParser = require("body-parser");
const path = require('path')
const fs = require('fs')


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
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    res.send('Please enter both username and password');
    return;
  }

  const user = { username, password };
  const login_filePath = path.join(__dirname, 'files', 'login.json');

  let data = [];

  if (fs.existsSync(login_filePath)) {
    try {
      const fileContent = fs.readFileSync(login_filePath, 'utf-8');
      if (fileContent.trim()) {
        data = JSON.parse(fileContent); 
      }
    } catch (err) {
      console.error('Error parsing JSON file:', err);
      res.status(500).send('Error reading login data');
      return;
    }
  }

  data.push(user);
  
  fs.writeFile(login_filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log('User details saved successfully!');
    res.render('index'); 

  });
});


app.get('/signout', (req, res) => {
  res.render('auth/login')
})


app.listen(port, () => {
  console.log(`Example app listening localhost:${port}`)
})