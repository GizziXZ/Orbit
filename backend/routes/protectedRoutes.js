const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed successfully' });
});

module.exports = router;