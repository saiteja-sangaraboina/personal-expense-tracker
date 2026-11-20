const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const Goal = require('../models/Goal');

dotenv.config();

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log('⚠️ MONGO_URI not set, skipping seed execution.');
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clean existing seed data
    await User.deleteMany({ email: 'demo@expensetracker.com' });

    // Create demo user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const user = await User.create({
      name: 'Demo User',
      email: 'demo@expensetracker.com',
      password: hashedPassword,
      currency: 'USD',
      theme: 'light',
    });

    console.log(`Demo user created: ${user.email}`);

    // Create realistic transactions
    const transactions = [
      { userId: user._id, type: 'income', amount: 5000, category: 'Salary', description: 'Monthly base salary', date: new Date(2026, 10, 1) },
      { userId: user._id, type: 'income', amount: 850, category: 'Freelance', description: 'Web UI design project', date: new Date(2026, 10, 5) },
      { userId: user._id, type: 'expense', amount: 1200, category: 'Bills', description: 'Apartment rent', date: new Date(2026, 10, 2) },
      { userId: user._id, type: 'expense', amount: 350, category: 'Food', description: 'Weekly groceries from Trader Joes', date: new Date(2026, 10, 3) },
      { userId: user._id, type: 'expense', amount: 45, category: 'Transportation', description: 'Metro pass recharge', date: new Date(2026, 10, 4) },
      { userId: user._id, type: 'expense', amount: 120, category: 'Entertainment', description: 'Concert tickets', date: new Date(2026, 10, 8) },
      { userId: user._id, type: 'expense', amount: 80, category: 'Healthcare', description: 'Pharmacy prescription', date: new Date(2026, 10, 10) },
      { userId: user._id, type: 'expense', amount: 210, category: 'Shopping', description: 'Winter running shoes', date: new Date(2026, 10, 12) },
      { userId: user._id, type: 'expense', amount: 65, category: 'Food', description: 'Dinner with friends', date: new Date(2026, 10, 15) },
      { userId: user._id, type: 'expense', amount: 30, category: 'Education', description: 'Fullstack engineering book', date: new Date(2026, 10, 18) },
    ];

    await Transaction.insertMany(transactions);
    console.log(`Seeded ${transactions.length} transactions`);

    // Create Budgets
    await Budget.create([
      { userId: user._id, category: 'Food', monthlyLimit: 600, month: 11, year: 2026, alertThreshold: 80 },
      { userId: user._id, category: 'Bills', monthlyLimit: 1500, month: 11, year: 2026, alertThreshold: 90 },
      { userId: user._id, category: 'Shopping', monthlyLimit: 400, month: 11, year: 2026, alertThreshold: 75 },
      { userId: user._id, category: 'Entertainment', monthlyLimit: 250, month: 11, year: 2026, alertThreshold: 80 },
    ]);
    console.log('Seeded demo budgets');

    // Create Goals
    await Goal.create([
      { userId: user._id, title: 'Emergency Fund', targetAmount: 10000, currentAmount: 4500, deadline: new Date(2027, 5, 1), category: 'Savings' },
      { userId: user._id, title: 'MacBook Pro Upgrade', targetAmount: 2500, currentAmount: 1800, deadline: new Date(2026, 11, 31), category: 'Tech' },
    ]);
    console.log('Seeded demo goals');

    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
