const express = require('express');
const { ensureAuthenticated } = require('../Middleware/authMiddleware');
const {listNewItem} = require('../controllers/listItemController');
const { uploadItemImage } = require('../Middleware/multerMiddleware');

const router =  express.Router()

router.post('/item/:userId', ensureAuthenticated, uploadItemImage.single('image'), listNewItem)
module.exports = router