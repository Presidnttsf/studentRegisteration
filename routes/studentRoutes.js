const express = require('express');
const { getStudents, addStudent, updateStudent, deleteStudent, loginStudent } = require('../controllers/studentController');

const router = express.Router();

// fist parameter is path and second is call back function which is coming from controllers
router.get('/getstudents', getStudents);
router.post('/addstudent', addStudent);
router.put('/updatestudent/:id', updateStudent);
router.delete('/deletestudent/:id', deleteStudent);
router.post('/loginstudent', loginStudent);

module.exports = router;
