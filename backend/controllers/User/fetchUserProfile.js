const User = require('../../models/users');
const jwt = require('jsonwebtoken');

async function fetchUserProfile(req, res) {
    try {
        const id = req.params.id;
        const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(id).populate({
            path: 'sortedPosts',
            populate: { path: 'user', select: 'username profilePicture' }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const enrichedPosts = user.sortedPosts.map(post => ({
            ...post.toObject(),
            isLiked: post.likes.includes(token.id),
            isBookmarked: user.bookmarks.includes(post.id),
        }));

        return res.status(200).json({
            user: {
                id, // i mean... why not? its just asking me to do it
                username: user.username,
                createdAt: user.createdAt,
                bio: user.bio,
                profilePicture: user.profilePicture,
                followers: user.followers.length,
                following: user.following.length,
                posts: enrichedPosts,
                isFollowed: user.followers.includes(token.id),
            }
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = fetchUserProfile;