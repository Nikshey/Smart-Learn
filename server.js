const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const enrollmentRoutes = require('./routes/enrollments');
const materialRoutes = require('./routes/materials');
const assignmentRoutes = require('./routes/assignments');
const submissionRoutes = require('./routes/submissions');

// Middleware
app.use(cors({
  origin: ['http://localhost:8000', 'http://localhost:8080'], // Allow requests from the frontend
  credentials: true
}));
app.use(express.json());

// MongoDB connection with error handling
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/school_management';

console.log('MongoDB URI:', MONGODB_URI); // Debug log

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB successfully');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  console.log('Continuing to start server without MongoDB connection...');
});

// Check MongoDB connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connection is open');
});

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);

// Basic routes
app.get('/', (req, res) => {
  res.send('School Management Backend Server is Running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});