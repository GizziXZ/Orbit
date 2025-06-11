const Post = require('../../models/posts');
const User = require('../../models/users');
const jwt = require('jsonwebtoken');

async function handleLike(req, res) {
    try {
        const like = req.body.liked;
        const postId = req.params.id;
        const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const userId = token.id;

        if (like === undefined || !postId || !userId) {
            return res.status(400).json({ message: 'Invalid request parameters' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const user = await User.findById(userId);

        if (like) {
            // check if its already liked first
            if (user.likedPosts.includes(postId)) {
                return res.status(400).json({ message: 'Post already liked' });
            }
            // Add the post to the user's liked posts
            user.likedPosts.push(postId);
            await user.save();
            if (!post.likes.includes(userId)) {
                post.likes.push(userId);
                await post.save();
            }
            return res.status(200).json({ message: 'Post liked successfully' });
        } else if (!like) {
            // check if its already not liked
            if (!user.likedPosts.includes(postId)) {
                return res.status(400).json({ message: 'Post not liked yet' });
            }
            // Remove the post from the user's liked posts
            user.likedPosts = user.likedPosts.filter(id => id.toString() !== postId);
            await user.save();
            if (post.likes.includes(userId)) {
                post.likes = post.likes.filter(id => id.toString() !== userId);
                await post.save();
            }
            return res.status(200).json({ message: 'Post unliked successfully' });
        }
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = handleLike;