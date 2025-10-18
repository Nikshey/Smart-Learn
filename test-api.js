const http = require('http');

const data = JSON.stringify({
  name: 'Test Course',
  code: 'TEST101',
  description: 'A test course',
  duration: '4 weeks',
  instructor: 'Test Teacher',
  instructorId: 'test@example.com'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/courses',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  console.log(`Status: ${res.statusCode}`);
  
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error('Error:', error);
});

req.write(data);
req.end();