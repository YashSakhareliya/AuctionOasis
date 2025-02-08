const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Cloudinary Storage for Profile Pictures

const profileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "auctionoasis/profile_picture",
        allowed_formats: ['jpg', 'png', 'jpeg' , 'svg'],
        transformation: [{ width: 500, height: 500, crop: "fill" }],
    },
});

const itemStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "auctionoasis/item_picture",
        allowed_formats: ['jpg', 'png', 'jpeg', 'svg'],
        transformation: [{ width: 800, height: 800, crop: "fill" }],
    }
})

module.exports = { profileStorage, itemStorage, cloudinary };