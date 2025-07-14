const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const seedUsers = async () => {
  try {
    await User.deleteMany();
    console.log('🧹 Old users removed');

    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = await User.insertMany([
      {
        name: 'Alice Employer',
        email: 'alice@company.com',
        password: hashedPassword,
        role: 'employer'
      },
      {
        name: 'Bob Employer',
        email: 'bob@company.com',
        password: hashedPassword,
        role: 'employer'
      }
    ]);

    console.log('👤 Employers seeded:', users.map(u => u.email));
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedUsers();
