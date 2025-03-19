const mongoose = require('mongoose'); // Importing Mongoose for MongoDB connection
require('dotenv').config(); // Loading environment variables from .env file

// Fetch the MongoDB connection string from environment variables
const CONNECTION_STRING = process.env.MONGO_URI;

/**
 * Function to connect to MongoDB using Mongoose
 */
const connectToDatabase = async () => {
  try {
    // Connect to MongoDB using the provided connection string
    await mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true, // Use new URL parser to avoid deprecation warnings
      useUnifiedTopology: true, // Use new Server Discovery and Monitoring engine
      useBigInt64: false,  // Explicitly disable useBigInt64 option to fix deserialization issue
    });
    console.log("Connected to database");
  } catch (error) {
    // Log and exit the process if connection fails
    console.log("Error connecting to database", error);
    process.exit(1); // Exit the application if DB connection fails
  }
};

module.exports = connectToDatabase;