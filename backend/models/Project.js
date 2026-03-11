const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  longDescription: {
    type: String,
    maxlength: [5000, 'Long description cannot exceed 5000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Fursuit Models', 'Fursuit Accessories', 'Digital Art', '2D & 3D', 'Video Projects']
  },
  images: [{
    url: String,
    publicId: String,
    alt: String
  }],
  thumbnail: {
    url: String,
    publicId: String,
    alt: String
  },
  videoUrl: {
    type: String,
    default: ''
  },
  tools: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  process: [{
    step: String,
    description: String,
    image: String
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create slug from title before saving
projectSchema.pre('save', function() {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  this.updatedAt = Date.now();
});

// Index for better query performance
projectSchema.index({ category: 1, featured: -1, createdAt: -1 });
projectSchema.index({ slug: 1 });

module.exports = mongoose.model('Project', projectSchema);
