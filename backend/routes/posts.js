const express = require('express');
const multer = require('multer');
const handleLike = require('../controllers/Post/handleLike');
const getPosts = require('../controllers/Post/getPosts');
const createPost = require('../controllers/Post/createPost');
const router = express.Router();
const upload = multer();

router.get('/', getPosts);
router.post('/:id/like', handleLike);
router.post('/create', upload.single('image'),createPost);

module.exports = router;