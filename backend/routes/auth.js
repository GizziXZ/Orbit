const express = require('express');
const { registerUser, loginUser, logoutUser, getUserData } = require('../controllers/authController');
const router = express.Router();

router.get('/me', getUserData);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;