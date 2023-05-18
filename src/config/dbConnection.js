import mongoose from 'mongoose';
import { DB_URI } from './index.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB: Connection successful!');
  } catch (error) {
    console.error('DB: Connection failed!', error);
  }
};