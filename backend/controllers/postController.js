const User = require('../models/users');
const jwt = require('jsonwebtoken');

async function handleLike(req, res) {
    try {
        const like = req.body.liked;
        const postId = req.params.id;
        const token = req.cookies.token;
        const userId = jwt.verify(token, process.env.JWT_SECRET).id;

        if (like === undefined || !postId || !userId) {
            return res.status(400).json({ message: 'Like state, Post ID and a valid token are required' });
        }

        if (like) {
            // check if its already liked first
            const user = await User.findById(userId);
            if (user.likedPosts.includes(postId)) {
                return res.status(400).json({ message: 'Post already liked' });
            }
            // Add the post to the user's liked posts
            user.likedPosts.push(postId);
            await user.save();
            return res.status(200).json({ message: 'Post liked successfully' });
        } else if (!like) {
            // check if its already not liked
            const user = await User.findById(userId);
            if (!user.likedPosts.includes(postId)) {
                return res.status(400).json({ message: 'Post not liked yet' });
            }
            // Remove the post from the user's liked posts
            user.likedPosts = user.likedPosts.filter(id => id.toString() !== postId);
            await user.save();
            return res.status(200).json({ message: 'Post unliked successfully' });
        }
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    handleLike,
}