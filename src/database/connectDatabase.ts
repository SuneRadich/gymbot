import { connect } from 'mongoose';
import { logger } from '../utils/logger';

/** Connect to the MongoDB database */
export const connectDatabase = async () => {
  await connect(process.env.MONGO_URI);
  logger.info('Database connected!');
};
