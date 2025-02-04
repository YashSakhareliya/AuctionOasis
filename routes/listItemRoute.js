const express = require('express');
const { ensureAuthenticated } = require('../Middleware/authMiddleware');
const {listNewItem} = require('../controllers/listItemController');

const router =  express.Router()

router.post('/item/:userId', ensureAuthenticated, listNewItem)
module.exports = router