import { getCompetitionMatches } from '../database/latestMatch';
import { logger } from '../utils/logger';

/** Interval */
let fetcher: NodeJS.Timer | null = null;

const competitionId = 46302;

// 30 minutes
const interval = 60 * 30 * 1000;

/** Start a fetching loop, that runs every {interval} miliseconds, and fetches matches from GoblinSpy */
export const startFetcher = async () => {
  logger.info(`Started fetching new match loop`);

  // Can be enabled to force fetching data on bot start
  // should be replaced by a slash admin command
  //await getCompetitionMatches(competitionId);

  fetcher = setInterval(async () => {
    logger.info(`Fetching competition matchs for competition ${competitionId}`);
    // fetch all competition matches, and store them in the database
    await getCompetitionMatches(competitionId);
  }, interval);
};

/** Stop the fetching loop */
export const killFetcher = () => {
  fetcher ? clearInterval(fetcher) : null;
};
