const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Admin = require('./models/Admin');

dotenv.config();

const sampleProjects = [
  // Add your projects here or through the admin panel
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Admin.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create sample projects one by one to trigger pre-save hooks
    for (const projectData of sampleProjects) {
      await Project.create(projectData);
    }
    console.log('📦 Created sample projects');

    // Create default admin
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', salt);
    
    await Admin.create({
      name: 'Artist Admin',
      email: process.env.ADMIN_EMAIL || 'admin@artist.com',
      password: hashedPassword,
      role: 'super-admin',
      bio: 'Professional digital artist specializing in fursuit models, digital art, and 3D creations.',
      socialLinks: {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        artstation: 'https://artstation.com'
      },
      skills: [
        { name: 'Digital Painting', level: 95 },
        { name: '3D Modeling', level: 90 },
        { name: 'Fursuit Making', level: 92 },
        { name: 'Animation', level: 85 },
        { name: 'Video Editing', level: 80 }
      ],
      experience: [
        {
          title: 'Freelance Digital Artist',
          company: 'Self-Employed',
          startDate: new Date('2020-01-01'),
          current: true,
          description: 'Creating custom fursuits, digital art commissions, and 3D models for clients worldwide.'
        },
        {
          title: '3D Artist',
          company: 'Game Studio',
          startDate: new Date('2018-01-01'),
          endDate: new Date('2019-12-31'),
          description: 'Created character models and environments for indie game projects.'
        }
      ]
    });
    console.log('👤 Created admin account');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📧 Admin credentials:');
    console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@artist.com'}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
