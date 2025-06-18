const jwt = require('jsonwebtoken');
const User = require('../../models/users');

async function getBookmarks(req, res) {
    try {
        const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(token.id).select('bookmarks');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const bookmarks = await user.populate({
            path: 'bookmarks',
            populate: {
                path: 'user',
                select: 'username'
            }
        }).then(u => u.bookmarks);

        const updatedBookmarks = bookmarks.map(post => ({ // enrich post but something tells me this is not the best way to do it
            ...post.toObject(),
            isLiked: post.likes.includes(token.id),
            isBookmarked: true
        }));

        return res.status(200).json({ bookmarks: updatedBookmarks });
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = getBookmarks;