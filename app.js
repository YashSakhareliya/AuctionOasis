require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const { verifyToken } = require('./Middleware/authMiddleware');
const path = require('path');
const  connectDb  =  require('./config/db')

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs'); // Use EJS as the template engine
app.set('views', path.join(__dirname, 'views'));
app.use(verifyToken); // Apply token verification globally

// connect with Database
connectDb()
// app.use((req, res, next) => {
//   res.locals.username = null; // Default value
//   next();
// });

// Import routes
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const liveAuctionRoutes = require('./routes/live_auction');
const userProfileRoutes = require('./routes/userProfile');

// Use routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/live',liveAuctionRoutes)
app.use('/profile',userProfileRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
