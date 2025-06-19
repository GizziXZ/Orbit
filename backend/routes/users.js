const express = require('express');
const fetchUserProfile = require('../controllers/User/fetchUserProfile');
const handleFollow = require('../controllers/User/handleFollow');
const saveSettings = require('../controllers/User/saveSettings');
const router = express.Router();

router.get('/:id', fetchUserProfile);
router.post('/:id/follow', handleFollow);
router.post('/settings', saveSettings);

module.exports = router;