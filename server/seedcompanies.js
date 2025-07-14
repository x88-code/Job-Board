const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Company = require('./models/company');
const User = require('./models/user');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const seedCompanies = async () => {
  try {
    await Company.deleteMany();
    console.log('🧹 Old companies removed');

    const companies = await Company.insertMany([
      { name: 'TechCorp', description: 'A tech company.', location: 'New York, NY' },
      { name: 'Designify', description: 'Design agency.', location: 'San Francisco, CA' }
    ]);

    console.log('🏢 Companies seeded:', companies.map(c => c.name));
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedCompanies();
