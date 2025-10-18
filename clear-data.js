const mongoose = require('mongoose');
require('dotenv').config();

// Import all models
const Student = require('./models/Student');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');
const Material = require('./models/Material');
const Assignment = require('./models/Assignment');
const Submission = require('./models/Submission');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/school_management';

mongoose.connect(MONGODB_URI)
.then(async () => {
  console.log('Connected to MongoDB successfully');
  
  try {
    // Clear all collections
    await Student.deleteMany({});
    console.log('Cleared all students');
    
    await Course.deleteMany({});
    console.log('Cleared all courses');
    
    await Enrollment.deleteMany({});
    console.log('Cleared all enrollments');
    
    await Material.deleteMany({});
    console.log('Cleared all materials');
    
    await Assignment.deleteMany({});
    console.log('Cleared all assignments');
    
    await Submission.deleteMany({});
    console.log('Cleared all submissions');
    
    console.log('\nAll data cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing data:', error);
    process.exit(1);
  }
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});