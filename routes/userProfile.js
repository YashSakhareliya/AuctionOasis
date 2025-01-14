const express = require('express');
const {renderUserProfile} = require('../controllers/userProfileController')
const router = express.Router()

router.get('/', renderUserProfile);

module.exports = router