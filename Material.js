const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['video', 'document', 'presentation', 'other']
  },
  fileName: {
    type: String
  },
  fileUrl: {
    type: String
  },
  description: {
    type: String
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  uploadedBy: {
    type: String,
    required: true
  },
  uploadedById: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Material', materialSchema);