const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/auth');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Register admin (only for initial setup)
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Check if this is the first admin
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return res.status(403).json({ message: 'Registration is disabled. Contact super admin.' });
    }

    const admin = await Admin.create({
      email,
      password,
      name,
      role: 'super-admin'
    });

    res.status(201).json({
      _id: admin._id,
      email: admin.email,
      name: admin.name,
      token: generateToken(admin._id)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login admin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for admin
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: admin._id,
      email: admin.email,
      name: admin.name,
      avatar: admin.avatar,
      role: admin.role,
      token: generateToken(admin._id)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get current admin
router.get('/me', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    
    res.json({
      _id: admin._id,
      email: admin.email,
      name: admin.name,
      avatar: admin.avatar,
      role: admin.role,
      bio: admin.bio,
      socialLinks: admin.socialLinks,
      skills: admin.skills,
      experience: admin.experience
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update admin profile
router.put('/me', protect, async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      _id: admin._id,
      email: admin.email,
      name: admin.name,
      avatar: admin.avatar,
      role: admin.role,
      bio: admin.bio,
      socialLinks: admin.socialLinks,
      skills: admin.skills,
      experience: admin.experience
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update password
router.put('/update-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id).select('+password');

    const isMatch = await admin.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
