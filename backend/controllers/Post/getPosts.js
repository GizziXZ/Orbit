const jwt = require('jsonwebtoken');
const Post = require('../../models/posts');
const User = require('../../models/users');

async function getPosts(req, res) {
    try {
        const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const posts = await Post.find()
        const user = await User.findById(token.id);

        const enrichedPosts = await Promise.all(
            posts.map(async post => ({
                ...post.toObject(),
                user: await User.findById(post.user).select('username'),
                isLiked: user.likedPosts.includes(post.id.toString()),
                isBookmarked: user.bookmarks.includes(post.id.toString()),
            }))
        );

        // Sort posts by creation date in descending order
        enrichedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return res.status(200).json(enrichedPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getPosts;