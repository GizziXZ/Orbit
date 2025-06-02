const express = require('express');
const { handleLike } = require('../controllers/postController');
const router = express.Router();

router.post('/:id/like', handleLike);

module.exports = router;