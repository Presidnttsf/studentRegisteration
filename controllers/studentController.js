const Student = require('../models/studentModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

exports.getStudents = async (req, res) => {
  try {
    const { name, email } = req.query;
    let filter = {};
    if (name) filter.name = new RegExp(name, "i");
    if (email) filter.email = new RegExp(email, "i");
    
    const students = await Student.find(filter);
    res.json(students);
  } catch (error) {
    console.error("Error getting students:", error);
    res.status(500).json({ message: "Error getting students" });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { name, email, phone, city, gender, courses, password } = req.body;
    if (!name || !email || !phone || !city || !gender || !courses || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({ name, email, phone, city, gender, courses, password: hashedPassword });
    await newStudent.save();
    
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Error registering student' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { name, email, phone, city, gender, courses } = req.body;
    
    if (!name || !email || !phone || !city || !gender || !courses) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedStudent = await Student.findByIdAndUpdate(studentId, { name, email, phone, city, gender, courses }, { new: true, runValidators: true });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Error updating student' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Error deleting student" });
  }
};


exports.loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email exists in the database
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ id: student._id }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
};

