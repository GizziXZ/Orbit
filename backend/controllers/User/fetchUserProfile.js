const User = require('../../models/users');
const jwt = require('jsonwebtoken');

async function fetchUserProfile(req, res) {
    try {
        const id = req.params.id;
        const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.populate('posts');
        return res.status(200).json({
            user: {
                username: user.username,
                createdAt: user.createdAt,
                bio: user.bio,
                profilePicture: user.profilePicture,
                followers: user.followers.length,
                following: user.following.length,
                posts: user.posts
            }
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = fetchUserProfile;