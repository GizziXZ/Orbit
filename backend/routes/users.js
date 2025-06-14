const express = require('express');
const fetchUserProfile = require('../controllers/User/fetchUserProfile');
const router = express.Router();

router.get('/:id', fetchUserProfile);

module.exports = router;