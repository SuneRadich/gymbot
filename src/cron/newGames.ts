import { getCompetitionMatches } from '../database/latestMatch';

/** Interval */
let fetcher = null;

// 30 minutes
const interval = 60 * 30 * 1000;

/** Start a fetching loop, that runs every {interval} miliseconds, and fetches matches from GoblinSpy */
  logger.info(`Started fetching new match loop`);

  fetcher = setInterval(async () => {
    // fetch all competition matches, and store them in the database
    await getCompetitionMatches();
  }, interval);
};

/** Stop the fetching loop */
export const killFetcher = () => {
  fetcher ? clearInterval(fetcher) : null;
};
