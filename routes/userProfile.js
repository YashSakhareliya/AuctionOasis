const express = require('express');
const {renderUserProfile , updateUserProfile} = require('../controllers/userProfileController')
const { ensureAuthenticated } = require('../Middleware/authMiddleware')
const {uploadProfile} = require('../Middleware/multerMiddleware')
const router = express.Router()


router.get('/:user',ensureAuthenticated, renderUserProfile);

router.post('/edit/:userId',ensureAuthenticated, uploadProfile.single('profilePicture'), updateUserProfile)
module.exports = router