const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectToDatabase = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectToDatabase();

// Routes
app.use('/', studentRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
