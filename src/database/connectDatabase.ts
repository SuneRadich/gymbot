import { connect } from 'mongoose';

/** Connect to the MongoDB database */
export const connectDatabase = async () => {
  await connect(process.env.MONGO_URI);
  console.log('Database Connected!');
};
