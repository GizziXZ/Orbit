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

        const postsWithLikeStatus = posts.map(post => ({
            ...post.toObject(),
            isLiked: user.likedPosts.includes(post.id.toString()),
        }));

        return res.status(200).json(postsWithLikeStatus);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getPosts;