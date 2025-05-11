require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

mongoose.connect(process.env.MONGOOSE_CONNECTION + 'Orbit');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log('Backend is running on port ' + port);
});