const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    // console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });
        res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = authenticateToken;