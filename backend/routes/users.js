const express = require('express');
const fetchUserProfile = require('../controllers/User/fetchUserProfile');
const handleFollow = require('../controllers/User/handleFollow');
const router = express.Router();

router.get('/:id', fetchUserProfile);
router.post('/:id/follow', handleFollow);

module.exports = router;