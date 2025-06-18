const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    confirmed: {
        type: Boolean,
        default: false,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    bio: {
        type: String,
        default: '',
    },
    profilePicture: {
        type: String,
        default: '',
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post',
        default: [],
    },
    likedPosts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post',
        default: [],
    },
    bookmarks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post',
        default: [],
    }
});

// Virtual for sorted posts (most recent first)
userSchema.virtual('sortedPosts', {
    ref: 'Post',
    localField: 'posts',
    foreignField: '_id',
    options: { sort: { createdAt: -1 } }
});

const User = mongoose.model('User', userSchema);

module.exports = User;