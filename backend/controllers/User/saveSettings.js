const User = require('../../models/users');
const jwt = require('jsonwebtoken');

async function saveSettings(req, res) {
    try {
        const settings = req.body;
        const token = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await User.findById(token.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.settings = { // honestly i barely understand this part myself but whatever
            ...user.settings,
            ...(typeof settings.privateProfile !== 'undefined' && { privateProfile: settings.privateProfile }),
            ...(typeof settings.emailNotifications !== 'undefined' && { emailNotifications: settings.emailNotifications }),
            ...(typeof settings.pushNotifications !== 'undefined' && { pushNotifications: settings.pushNotifications }),
            ...(typeof settings.showOnlineStatus !== 'undefined' && { showOnlineStatus: settings.showOnlineStatus }),
            ...(typeof settings.allowMessagesFrom !== 'undefined' && { allowMessagesFrom: settings.allowMessagesFrom })
        };

        await user.save();
        res.status(200).json({ message: 'Settings updated successfully', settings: user.settings });
    } catch (error) {
        console.error('Error saving settings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = saveSettings;