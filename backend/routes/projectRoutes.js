const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');

// Get all projects with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { category, featured, page = 1, limit = 12, search } = req.query;
    
    let query = { status: 'published' };
    
    if (category) {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }
    
    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Project.countDocuments(query);
    
    res.json({
      projects,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ 
      featured: true, 
      status: 'published' 
    })
      .sort({ order: 1, createdAt: -1 })
      .limit(6);
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get projects by category
router.get('/category/:category', async (req, res) => {
  try {
    const projects = await Project.find({ 
      category: req.params.category,
      status: 'published' 
    })
      .sort({ createdAt: -1 });
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single project by slug
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Increment view count
    project.views += 1;
    await project.save();
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Project.distinct('category', { status: 'published' });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new project (protected)
router.post('/', protect, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update project (protected)
router.put('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete project (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
