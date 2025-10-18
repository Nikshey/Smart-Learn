const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');

// Create a new submission
router.post('/', async (req, res) => {
  try {
    const { assignmentId, studentId, courseId, answers } = req.body;
    
    // Check if assignment exists
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    // Check if submission already exists for this student and assignment
    const existingSubmission = await Submission.findOne({ assignmentId, studentId });
    if (existingSubmission) {
      return res.status(400).json({ message: 'Submission already exists for this assignment' });
    }
    
    const submission = new Submission({
      assignmentId,
      studentId,
      courseId,
      answers
    });
    
    const newSubmission = await submission.save();
    res.status(201).json(newSubmission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get submissions by assignment
router.get('/assignment/:assignmentId', async (req, res) => {
  try {
    const submissions = await Submission.find({ assignmentId: req.params.assignmentId });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get submissions by course
router.get('/assignment/course/:courseId', async (req, res) => {
  try {
    // First get all assignments for this course
    const assignments = await Assignment.find({ courseId: req.params.courseId });
    const assignmentIds = assignments.map(assignment => assignment._id);
    
    // Then get all submissions for these assignments
    const submissions = await Submission.find({ assignmentId: { $in: assignmentIds } });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get submissions by student
router.get('/student/:studentId', async (req, res) => {
  try {
    const submissions = await Submission.find({ studentId: req.params.studentId });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific submission
router.get('/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a submission (for grading)
router.put('/:id', async (req, res) => {
  try {
    const { totalPoints, graded, gradedBy } = req.body;
    
    const submission = await Submission.findByIdAndUpdate(
      req.params.id, 
      { 
        totalPoints, 
        graded, 
        gradedBy,
        gradedAt: new Date()
      }, 
      { new: true }
    );
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a submission
router.delete('/:id', async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json({ message: 'Submission deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;