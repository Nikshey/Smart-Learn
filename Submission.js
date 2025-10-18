const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true
  },
  answerText: {
    type: String
  },
  selectedOptions: [{
    type: String
  }]
});

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  answers: [answerSchema],
  submittedAt: {
    type: Date,
    default: Date.now
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  graded: {
    type: Boolean,
    default: false
  },
  gradedBy: {
    type: String
  },
  gradedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Submission', submissionSchema);