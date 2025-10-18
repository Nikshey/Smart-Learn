const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Enroll in a course
router.post('/', async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    
    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const enrollment = new Enrollment({
      studentId,
      courseId
    });
    
    const newEnrollment = await enrollment.save();
    res.status(201).json(newEnrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get enrollments by student
router.get('/student/:studentId', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.params.studentId })
      .populate('courseId');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get enrollments by course
router.get('/course/:courseId', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ courseId: req.params.courseId });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all enrollments
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Unenroll from a course
router.delete('/:studentId/:courseId', async (req, res) => {
  try {
    const enrollment = await Enrollment.findOneAndDelete({
      studentId: req.params.studentId,
      courseId: req.params.courseId
    });
    
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    
    res.json({ message: 'Unenrolled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;