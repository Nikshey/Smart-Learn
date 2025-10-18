const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const Course = require('../models/Course');

// Upload a material
router.post('/', async (req, res) => {
  try {
    const { title, courseId, type, fileName, fileUrl, description, uploadedBy, uploadedById } = req.body;
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const material = new Material({
      title,
      courseId,
      type,
      fileName,
      fileUrl,
      description,
      uploadedBy,
      uploadedById
    });
    
    const newMaterial = await material.save();
    res.status(201).json(newMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get materials by course
router.get('/course/:courseId', async (req, res) => {
  try {
    const materials = await Material.find({ courseId: req.params.courseId });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all materials
router.get('/', async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific material
router.get('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a material
router.put('/:id', async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.json(material);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a material
router.delete('/:id', async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.json({ message: 'Material deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;