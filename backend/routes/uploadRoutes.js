const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const fs = require('fs');
const path = require('path');

// Upload single image
router.post('/image', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'artist-portfolio/images',
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    });

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height
    });
  } catch (error) {
    // Clean up local file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message });
  }
});

// Upload multiple images
router.post('/images', protect, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadPromises = req.files.map(file =>
      cloudinary.uploader.upload(file.path, {
        folder: 'artist-portfolio/images',
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' }
        ]
      })
    );

    const results = await Promise.all(uploadPromises);

    // Delete local files
    req.files.forEach(file => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });

    const uploadedImages = results.map(result => ({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height
    }));

    res.json(uploadedImages);
  } catch (error) {
    // Clean up local files on error
    req.files.forEach(file => {
      if (file && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
    res.status(500).json({ message: error.message });
  }
});

// Upload video
router.post('/video', protect, upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'artist-portfolio/videos',
      resource_type: 'video',
      transformation: [
        { quality: 'auto:good' }
      ]
    });

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
      duration: result.duration
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message });
  }
});

// Delete image from Cloudinary
router.delete('/image/:publicId', protect, async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.publicId);
    res.json({ message: 'Image deleted successfully', result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
