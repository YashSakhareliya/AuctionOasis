const express = require('express');
const { loginUser, registerUser, renderLogin, renderRegister, signOut } = require('../controllers/authController');

const router = express.Router();

router.get('/login', renderLogin);
router.post('/login', loginUser);

router.get('/register', renderRegister);
router.post('/register', registerUser);

router.get('/signout', signOut);

module.exports = router;
