const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectToDatabase = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',             // local
  // 'https://your-frontend-url.com',     // your deployed frontend (e.g., Netlify/Vercel)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.options('*', cors());

// JSON parser
app.use(express.json());

// DB connection
connectToDatabase();

// Routes
app.use('/', studentRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
