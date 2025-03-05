// Import required modules
const express = require('express'); // Importing Express framework
const cors = require('cors'); // Importing CORS to enable cross-origin requests
const app = express(); // Initializing Express application
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB connection
require('dotenv').config(); // Loading environment variables from .env file

// Logging the MongoDB connection URI (for debugging purposes)
console.log("env check: ",process.env.port);

// Define the port number on which the server will run
const PORT = process.env.PORT || 5000; // Default port is 5000 if not specified

// Middleware setup
app.use(cors()); // Enables CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Enables JSON request body parsing

// Define the database name (though it's not used explicitly here)
let DATABASENAME = "studentsDb";

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
    });
    console.log("Connected to database");
  } catch (error) {
    // Log and exit the process if connection fails
    console.log("Error connecting to database", error);
    process.exit(1); // Exit the application if DB connection fails
  }
};

// Call the function to establish a database connection
connectToDatabase();

/**
 * ✅ Define Mongoose Schema & Model for the "studentsReg" collection
 */
const studentSchema = new mongoose.Schema({
  name: String, // Student's name
  email: String, // Student's email
  phone: String, // Student's phone number
  city: String, // City where the student lives
  gender: String, // Gender of the student
  courses: String, // Courses the student is enrolled in
  password: String, // Student's password (⚠️ Should be hashed before saving)
  profile: String, // Profile picture URL or path
}, { collection: 'studentsReg' }); // Explicitly specifying the collection name in MongoDB

// Creating a Mongoose model for "studentsReg" collection
const Student = mongoose.model('Student', studentSchema, "studentsReg");

/**
 * API Endpoint: GET /getstudents
 * Purpose: Fetches all student records from the database and returns them as JSON
 */
app.get('/getstudents', async (req, res) => {
  try {
    const students = await Student.find(); // Retrieve all student records from DB
    res.json(students); // Send the retrieved data as JSON response
  } catch (error) {
    console.log("Error getting students", error); // Log any errors
    res.status(500).json({ message: "Error getting students" }); // Send error response
  }
});

/**
 * Start the Express server
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log message when server starts
});
