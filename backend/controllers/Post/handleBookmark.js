const jwt = require('jsonwebtoken');
const User = require('../../models/users');

async function handleBookmark(req, res) {
    try {
        const bookmark = req.body.bookmark
        const postId = req.params.id
        const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const userId = token.id

        if (bookmark === undefined || !postId || !userId) {
            return res.status(400).json({ message: 'Invalid request parameters' });
        }

        if (bookmark) {
            // Check if the post is already bookmarked
            const user = await User.findById(userId);
            if (user.bookmarks.includes(postId)) {
                return res.status(400).json({ message: 'Post already bookmarked' });
            }
            // Add the post to the user's bookmarked posts
            user.bookmarks.push(postId);
            await user.save();
            return res.status(200).json({ message: 'Post bookmarked successfully' });
        } else if (!bookmark) {
            // Check if the post is already not bookmarked
            const user = await User.findById(userId);
            if (!user.bookmarks.includes(postId)) {
                return res.status(400).json({ message: 'Post not bookmarked yet' });
            }
            // Remove the post from the user's bookmarked posts
            user.bookmarks = user.bookmarks.filter(id => id.toString() !== postId);
            await user.save();
            return res.status(200).json({ message: 'Post unbookmarked successfully' });
        }
    } catch (error) {
        console.error('Error handling bookmark:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = handleBookmark;