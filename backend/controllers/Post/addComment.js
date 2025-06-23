const jwt = require('jsonwebtoken');
const Post = require('../../models/posts');
const User = require('../../models/users');

async function addComment(req, res) {
    const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const postId = req.params.id;
    const { text } = req.body;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Comment text cannot be empty' });
    }

    try {
        const user = await User.findById(token.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const comment = {
            user: user.id,
            text: text.trim(),
            createdAt: new Date(),
        };

        post.comments.push(comment);
        await post.save();
        const populatedComment = {
            ...comment,
            user: {
                id: user.id,
                username: user.username,
                profilePicture: user.profilePicture
            }
        };
        return res.status(201).json(populatedComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = addComment;