const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const Course = require('../models/Course');

// Create a new assignment
router.post('/', async (req, res) => {
  try {
    const { title, courseId, description, dueDate, points, questions, createdBy, createdById } = req.body;
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const assignment = new Assignment({
      title,
      courseId,
      description,
      dueDate,
      points,
      questions: questions || [],
      createdBy,
      createdById
    });
    
    const newAssignment = await assignment.save();
    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get assignments by course
router.get('/course/:courseId', async (req, res) => {
  try {
    const assignments = await Assignment.find({ courseId: req.params.courseId });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific assignment
router.get('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an assignment
router.put('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an assignment
router.delete('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;