import { getCompetitionMatches } from '../database/latestMatch';
import { logger } from '../utils/logger';

/** Interval */
let fetcher = null;

// 30 minutes
const interval = 60 * 30 * 1000;

/** Start a fetching loop, that runs every {interval} miliseconds, and fetches matches from GoblinSpy */
export const startFetcher = async () => {
  logger.info(`Started fetching new match loop`);

  // Can be enalbed to force fetching data on bot start
  // should be replaced by a slash admin command
  //await getCompetitionMatches(42122);

  fetcher = setInterval(async () => {
    // fetch all competition matches, and store them in the database
    await getCompetitionMatches(42122);
  }, interval);
};

/** Stop the fetching loop */
export const killFetcher = () => {
  fetcher ? clearInterval(fetcher) : null;
};
