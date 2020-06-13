const express = require('express');
const covid = require('./routes/covid');
const connectDB = require('./config/db');

// Connect to DB
connectDB();

// Instatiate ExpressJS
const app = express();

// Middleware for body parser
app.use(express.json());

// Middleware to import routes
app.use('/covid', covid);


app.get('/', (req, res) => {
    res.send('Landing page!!');
});

// Enable HTTP Server
app.listen(3500, () => console.log('App running on port 3500'));