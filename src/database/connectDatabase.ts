import mongoose from 'mongoose';
import { logger } from '../utils/logger';

/** Connect to the MongoDB database */
export const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'no_mongo');
  logger.info('Database connected!');
};
