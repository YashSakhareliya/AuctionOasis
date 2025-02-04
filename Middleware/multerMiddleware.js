const multer  = require('multer')
const {profileStorage} = require('../config/cloudinaryConfig')
const {itemStorage} = require('../config/cloudinaryConfig')

// Multer Middleware
const uploadProfile = multer({ storage: profileStorage });
const uploadItemImage = multer({ storage: itemStorage })

module.exports = { uploadProfile, uploadItemImage }