const User = require('../../models/users');
const jwt = require('jsonwebtoken');

async function handleFollow(req, res) {
    try {
        const { id } = req.params;
        const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (id === token.id) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const user = await User.findById(id);
        const currentUser = await User.findById(token.id);

        if (!user || !currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.followers.includes(token.id)) {
            // Unfollow the user
            user.followers.pull(token.id);
            if (currentUser.following.includes(id)) { // the reason why this is a separate check is just to be sure both following and followers are in sync
                currentUser.following.pull(id);
            }
        } else {
            // Follow the user
            user.followers.push(token.id);
            if (!currentUser.following.includes(id)) {
                currentUser.following.push(id);
            }
        }

        await user.save();
        await currentUser.save();
        return res.status(200).json({ isFollowed: user.followers.includes(token.id) });
    } catch (error) {
        console.error("Error following user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = handleFollow;