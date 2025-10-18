// Using built-in fetch API

// Test course creation
const testCourseCreation = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Course',
        code: 'TEST' + Date.now(),
        description: 'This is a test course',
        duration: '4 weeks',
        instructor: 'Test Instructor',
        instructorId: 'test@example.com'
      })
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testCourseCreation();