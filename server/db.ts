import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be set in your .env file");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};