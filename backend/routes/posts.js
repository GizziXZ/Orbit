const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const handleLike = require('../controllers/Post/handleLike');
const getPosts = require('../controllers/Post/getPosts');
const createPost = require('../controllers/Post/createPost');
const handleBookmark = require('../controllers/Post/handleBookmark');
const getBookmarks = require('../controllers/Post/getBookmarks');

router.get('/', getPosts);
router.post('/:id/like', handleLike);
router.post('/create', upload.single('image'), createPost);
router.post('/:id/bookmark', handleBookmark);
router.get('/bookmarks', getBookmarks);

module.exports = router;