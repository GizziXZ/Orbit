const jwt = require('jsonwebtoken');
const Post = require('../../models/posts');
const User = require('../../models/users');

async function createPost(req, res) {
    try {
        const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(token.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { caption } = req.body;
        const image = req.file;
        if (!caption || !image) {
            return res.status(400).json({ message: 'Caption and image are required' });
        }

        const newPost = new Post({
            user: user.id,
            caption,
            image: `data:${image.mimetype};base64,${image.buffer.toString('base64')}`,
        });

        await newPost.save();
        user.posts.push(newPost.id);
        await user.save();
        return res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = createPost;