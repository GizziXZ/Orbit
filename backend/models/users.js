const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    confirmed: {
        type: Boolean,
        default: false,
    },
    displayName: {
        type: String,
        required: true,
        default: function() {
            return this.username; // Default to username
        },
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
        default: 'https://cdn.discordapp.com/emojis/814750724939841547.webp?size=96&animated=true', // funny cat kissing camera
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
    },
    settings: {
        type: Object,
        default: {
            privateProfile: false,
            emailNotifications: false,
            pushNotifications: true,
            showOnlineStatus: true,
            allowMessagesFrom: 'everyone', // 'everyone', 'followers', 'no one'
        }
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