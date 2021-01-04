const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect database, check  config/db.js
connectDB();

// init middleware
app.use(express.json({ extended: false }));

// Define routes:
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/visitor', require('./routes/visitor'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
