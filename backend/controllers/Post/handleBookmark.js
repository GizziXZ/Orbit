const jwt = require('jsonwebtoken');
const Post = require('../../models/Post');
const User = require('../../models/User');

async function handleBookmark(req, res) {
    try {
        
    } catch (error) {
        console.error('Error handling bookmark:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = handleBookmark;