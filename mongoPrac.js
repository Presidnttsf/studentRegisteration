const express = require('express');
const app = express();
const connectToDatabase = require('./config/db');
const { ObjectId } = require('mongoose').Types;
const Student = require('./models/studentModel')

const PORT = 5003;

connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

async function deleteStudents(ids) {
  try {
    const result = await Student.deleteMany({ _id: { $in: ids.map(id => new ObjectId(id)) } });
    
    let count = await Student.countDocuments();
    console.log(`Data deleted successfully. ${result.deletedCount} students removed.`, "Remaining students:", count);
  } catch (err) {
    console.error("Error deleting data:", err);
  }
}

// deleteStudents(["67c96ec3abc973b9628517c3", "67cab7ce917faa0c0cbcc9b5"]);

async function insertStudents(data) {
    try {
        const result = await Student.insertMany(data); // Directly insert the array of students
        let count = await Student.countDocuments();

        console.log(`Data inserted successfully. ${result.length} students added.`);
        console.log(`Total students: ${count}`);
    } catch (err) {
        console.error("Error inserting data:", err);
    }
}

// Example usage:
const studentsData = [
    {
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "9876543210",
        city: "New York",
        gender: "Male",
        courses: "Web Development",
        password: "123456"
    },
    {
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "9876543222",
        city: "Los Angeles",
        gender: "Female",
        courses: "Data Science",
        password: "123456"
    }
];

// insertStudents(studentsData)

async function findStudent() {
    try {
        let result = await Student.findOne({ name: "John Doe" });
        console.log("Student found:", result.name);
    } catch (err) {
        console.error("Error finding student:", err);
    }
}

// findStudent();

async function findListofStudents(query) {
    try {
        let result = await Student.find(query);

        if (result.length > 0) {
            console.log("Students found:", result);
            console.log("No of Students found:", result.length);
        } else {
            console.log("No students found.");
        }
    } catch (err) {
        console.error("Error finding students:", err);
    }
}

findListofStudents( {city: {$regex: "chennai", $options: "i"} });
