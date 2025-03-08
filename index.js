// Import required modules
const express = require('express'); // Importing Express framework
const cors = require('cors'); // Importing CORS to enable cross-origin requests
const app = express(); // Initializing Express application
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB connection
require('dotenv').config(); // Loading environment variables from .env file
const bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing

// Logging the MongoDB connection URI (for debugging purposes)
console.log("env check: ",process.env.port);

// Define the port number on which the server will run
const PORT = process.env.PORT || 5000; // Default port is 5000 if not specified

// Middleware setup
app.use(cors()); // Enables CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Enables JSON request body parsing


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
 * Start the Express server
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log message when server starts
});


// home page
app.get('/', (req, res) => {
  res.send('Welcome to home page API');
});




/**
 * Define Mongoose Schema & Model for the "studentsReg" collection
 */
const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    match: /^[A-Za-z\s]+$/ // Allows only letters and spaces
  }, // Student's name
  email: String, // Student's email
  phone: String, // Student's phone number
  city: String, // City where the student lives
  gender: String, // Gender of the student
  courses: String, // Courses the student is enrolled in
  password: String, // Student's password (⚠️ Should be hashed before saving)
  profile: String, // Profile picture URL or path
}, { collection: 'studentsReg', versionKey: false }); // Explicitly specifying the collection name in MongoDB

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


// API Endpoint: POST /addstudent
app.post('/addstudent', async (req, res) => {
    try {
      // Get the student details from the request body
      const { name, email, phone, city, gender, courses, password } = req.body;
  
      // Step 1: Check if all required fields are provided
      if (!name || !email || !phone || !city || !gender || !courses || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Step 2: Check if a student with the same email already exists in the database
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      // Step 3: Hash the password before saving it to the database
      // Hashing improves security by storing an encrypted version of the password
      const hashedPassword = await bcrypt.hash(password, 10); // "10" is the encryption level
  
      // Step 4: Create a new student object with the provided details
      const newStudent = new Student({
        name,      
        email,      
        phone,      
        city,       
        gender,     
        courses,    
        password: hashedPassword, // Store the hashed password
      });
  
      // Step 5: Save the student data in the database
      await newStudent.save();
  
      // Step 6: Send a success message to confirm registration
      res.status(201).json({ message: 'Student registered successfully' });
  
    } catch (error) {
      // If there is an error, log it and send an error response
      console.error('Error registering student:', error);
      res.status(500).json({ message: 'Error registering student' });
    }
  });
  