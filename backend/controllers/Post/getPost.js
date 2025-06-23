const jwt = require('jsonwebtoken');
const Post = require('../../models/posts');
const User = require('../../models/users');

async function getPost(req, res) {
    try {
        const postId = req.params.id;
        const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const post = await Post.findById(postId);
        if (!post || !postId) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const user = await User.findById(token.id);

        const commentsWithUsers = await Promise.all(
            post.comments.map(async (comment) => {
                const commentUser = await User.findById(comment.user).select('username profilePicture');
                return {
                    ...comment.toObject(),
                    user: commentUser
                };
            })
        );

        const enrichedPost = {
            ...post.toObject(),
            user: await User.findById(post.user).select('username profilePicture'),
            isLiked: user.likedPosts.includes(post.id.toString()),
            isBookmarked: user.bookmarks.includes(post.id.toString()),
            comments: commentsWithUsers
        }

        return res.status(200).json(enrichedPost);
    } catch (error) {
        console.error('Error fetching post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = getPost;