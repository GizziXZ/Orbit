const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    likes: {
        type: [String],
        default: [],
    },
    comments: {
        type: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                comment: String,
                createdAt: { type: Date, default: Date.now },
            },
        ],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;