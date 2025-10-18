const mongoose = require('mongoose');
require('dotenv').config();

// Import the Student model
const Student = require('./models/Student');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/school_management';

mongoose.connect(MONGODB_URI)
.then(async () => {
  console.log('Connected to MongoDB successfully');
  
  // Create sample students
  const sampleStudents = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      studentId: 'STU001',
      grade: '10th Grade'
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      studentId: 'STU002',
      grade: '11th Grade'
    },
    {
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      studentId: 'STU003',
      grade: '12th Grade'
    }
  ];

  try {
    // Clear existing students
    await Student.deleteMany({});
    console.log('Cleared existing students');
    
    // Insert sample students
    const insertedStudents = await Student.insertMany(sampleStudents);
    console.log(`Inserted ${insertedStudents.length} sample students`);
    
    // Display inserted students
    console.log('Sample students in database:');
    insertedStudents.forEach(student => {
      console.log(`- ${student.name} (${student.email}) - ${student.grade}`);
    });
    
    console.log('\nTest data setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error inserting sample data:', error);
    process.exit(1);
  }
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});