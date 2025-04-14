const mongoose = require("mongoose")

/**
 * Define Mongoose Schema & Model for the "studentsReg" collection
 */
const studentSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true,
      match: /^[A-Za-z0-9\s]+$/
      // Allows  letters, numbers and spaces
    }, // Student's name
    email: {type: String, unique: true}, // Student's email
    phone: String, // Student's phone number
    city: String, // City where the student lives
    gender: String, // Gender of the student
    courses: String, // Courses the student is enrolled in
    password: String, // Student's password (⚠️ Should be hashed before saving)
    
  }, { collection: 'studentsReg', versionKey: false }); // Explicitly specifying the collection name in MongoDB
  
  // Creating a Mongoose model for "studentsReg" collection
  const Student = mongoose.model('Student', studentSchema, "studentsReg");

  module.exports = Student;
  