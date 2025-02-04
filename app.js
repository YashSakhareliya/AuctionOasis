require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require('path');
const { verifyToken } = require('./Middleware/authMiddleware');
const { appendLogs } = require('./Middleware/logMiddleware');
const  connectDb  =  require('./config/db')
const Transaction = require('./models/transactionModel');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs'); // Use EJS as the template engine
app.set('views', path.join(__dirname, 'views'));
app.use(verifyToken);

// connect with Database
connectDb();

// Import routes
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const liveAuctionRoutes = require('./routes/live_auction');
const userProfileRoutes = require('./routes/userProfile');
const walletRoutes = require('./routes/walletRoute');
const listItemRoutes = require('./routes/listItemRoute');
// Log Middleware
app.use(appendLogs);

// Use routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/live',liveAuctionRoutes)
app.use('/profile',userProfileRoutes);
app.use('/wallet',walletRoutes);
app.use('/list', listItemRoutes);




// Error handling middleware
app.use((err, req, res, next) => {
  console.log("in error handling middleware")
  console.log(err);
  res.status(err.statusCode || 500).render('error', {
    statusCode: err.statusCode || 500,
    errorMessage: err.message || 'An unexpected error occurred'
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
