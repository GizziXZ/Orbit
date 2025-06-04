const express = require('express');
const handleLike = require('../controllers/Post/handleLike');
const getPosts = require('../controllers/Post/getPosts');
const router = express.Router();

router.post('/:id/like', handleLike);
router.get('/', getPosts);

module.exports = router;