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
        type: [String],
        default: [],
    },
    following: {
        type: [String],
        default: [],
    },
    posts: {
        type: [String],
        default: [],
    },
    likedPosts: {
        type: [String],
        default: [],
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;