require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const authenticateToken = require('./middleware/authMiddleware');

mongoose.connect(process.env.MONGOOSE_CONNECTION + 'Orbit');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/protected', require('./routes/protectedRoutes'));
app.use('/api/post', require('./routes/post'));
app.use('/api/users', require('./routes/users'));

// app.use(express.static(path.join(__dirname, '../frontend/build')));

app.listen(port, () => {
    console.log('Backend is running on port ' + port);
});