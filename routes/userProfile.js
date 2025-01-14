const express = require('express');
const {renderUserProfile} = require('../controllers/userProfileController')
const { ensureAuthenticated } = require('../Middleware/authMiddleware')
const router = express.Router()

router.get('/:user',ensureAuthenticated, renderUserProfile);

module.exports = router