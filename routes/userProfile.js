const express = require('express');
const {renderUserProfile , updateUserProfile} = require('../controllers/userProfileController')
const { ensureAuthenticated } = require('../Middleware/authMiddleware')
const router = express.Router()

router.get('/:user',ensureAuthenticated, renderUserProfile);

router.post('/edit/:userId',ensureAuthenticated, updateUserProfile)
module.exports = router