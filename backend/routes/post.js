const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const handleLike = require('../controllers/Post/handleLike');
const getPost = require('../controllers/Post/getPost');
const getPosts = require('../controllers/Post/getPosts');
const createPost = require('../controllers/Post/createPost');
const handleBookmark = require('../controllers/Post/handleBookmark');
const getBookmarks = require('../controllers/Post/getBookmarks');
const addComment = require('../controllers/Post/addComment');
const deleteComment = require('../controllers/Post/deleteComment');

router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/bookmarks', getBookmarks);
router.post('/:id/like', handleLike);
router.post('/create', upload.single('image'), createPost);
router.post('/:id/bookmark', handleBookmark);
router.post('/:id/comment', addComment);
router.delete('/:id/comment/:commentId', deleteComment);

module.exports = router;