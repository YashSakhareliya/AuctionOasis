const multer  = require('multer')
const {profileStorage} = require('../config/cloudinaryConfig')

// Multer Middleware
const uploadProfile = multer({ storage: profileStorage });

module.exports = { uploadProfile }