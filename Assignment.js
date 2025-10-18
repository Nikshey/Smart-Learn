const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    required: true,
    enum: ['multiple-choice', 'short-answer', 'long-answer']
  },
  options: [{
    text: String,
    isCorrect: Boolean
  }],
  points: {
    type: Number,
    required: true,
    default: 1
  }
});

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    required: true
  },
  createdById: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Assignment', assignmentSchema);