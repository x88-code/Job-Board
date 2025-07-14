// seedJobs.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const Company = require('./models/company');
const User = require('./models/user');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

const seedJobs = async () => {
  try {
    // Remove existing jobs
    await Job.deleteMany();
    console.log('🧹 Old jobs removed');

    // Get one existing company and one employer (user)
    const company = await Company.findOne();
    const employer = await User.findOne();

    if (!company || !employer) {
      throw new Error('Company or employer not found. Please seed them first.');
    }

    // Create job data
    const jobs = [
      {
        title: 'Frontend Developer',
        description: 'Join our frontend team to build amazing UIs.',
        requirements: ['React', 'JavaScript', 'CSS'],
        responsibilities: ['Build responsive designs', 'Collaborate with backend'],
        company: company._id,
        employer: employer._id,
        location: 'New York, NY',
        jobType: 'full-time',
        workMode: 'onsite',
        salary: {
          min: 70000,
          max: 90000,
          currency: 'USD',
          period: 'yearly',
        },
        category: 'technology',
        experienceLevel: 'mid',
        tags: ['frontend', 'react', 'javascript'],
        skills: ['React', 'JavaScript', 'HTML', 'CSS'],
        benefits: ['Health insurance', 'Paid time off'],
        applicationDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        applicationInstructions: 'Send your portfolio to jobs@techcorp.com',
        contactEmail: 'hr@techcorp.com',
      },
      {
        title: 'Backend Engineer',
        description: 'We are hiring experienced backend developers.',
        requirements: ['Node.js', 'MongoDB', 'API development'],
        responsibilities: ['Develop scalable APIs', 'Maintain database integrations'],
        company: company._id,
        employer: employer._id,
        location: 'Remote',
        jobType: 'remote',
        workMode: 'remote',
        salary: {
          min: 80000,
          max: 100000,
          currency: 'USD',
          period: 'yearly',
        },
        category: 'technology',
        experienceLevel: 'senior',
        tags: ['backend', 'nodejs', 'api'],
        skills: ['Node.js', 'MongoDB', 'Express'],
        benefits: ['Remote work', 'Stock options'],
        applicationDeadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        applicationInstructions: 'Apply through our careers page.',
        contactEmail: 'backend@techcorp.com',
      }
    ];

    // Save each job using .save() to trigger Mongoose middleware
    for (const jobData of jobs) {
      const job = new Job(jobData);
      await job.save();
    }

    console.log('🌱 Jobs seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  }
};

seedJobs();
