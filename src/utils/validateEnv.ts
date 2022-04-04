import { logger } from './logger';

export const validateEnv = () => {
  if (!process.env.DISCORD_TOKEN) {
    console.warn('Missing Discord bot token.');
    return false;
  }

  if (!process.env.MONGO_URI) {
    console.warn('Missing MongoDB connection.');
    return false;
  }

  if (!process.env.CLIENT_ID) {
    logger.warn('Missing Client id');
  }

  if (!process.env.CYANIDE_API_KEY) {
    logger.warn('Missing api key');
  }
  return true;
};
