const jwt = require('jsonwebtoken');
const Post = require('../../models/posts');
const User = require('../../models/users');

async function deleteComment(req, res) {
    const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const postId = req.params.id;
    const commentId = req.params.commentId;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!postId || !commentId) {
        return res.status(400).json({ error: 'Post ID and Comment ID are required' });
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

        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId && comment.user._id.toString() === user.id);
        if (commentIndex === -1) {
            return res.status(404).json({ error: 'Comment not found or you do not have permission to delete this comment' });
        }

        post.comments.splice(commentIndex, 1);
        await post.save();
        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = deleteComment;