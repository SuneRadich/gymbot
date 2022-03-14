import { getCompetitionMatches } from '../database/latestMatch';
import ChannelCompetition from '../database/models/ChannelCompetition';
import { logger } from '../utils/logger';

/** Interval */
let fetcher: NodeJS.Timer | null = null;

const numberOfMinutes = 1;
const interval = numberOfMinutes * 60 * 1000;

/** Start a fetching loop, that runs every {interval} miliseconds, and fetches matches from GoblinSpy */
export const startFetcher = async () => {
  // ARray o
  const compIds: number[] = await (
    await ChannelCompetition.find({}).select('competitionId')
  ).map((entry) => {
    return entry.competitionId;
  });

  logger.info(`Started fetching new match loop: ${compIds}`);

  // Can be enabled to force fetching data on bot start
  // should be replaced by a slash admin command
  //await getCompetitionMatches(competitionId);

  fetcher = setInterval(async () => {
    await Promise.all(
      compIds.map(async (compId) => {
        logger.info(`Fetching competition matches for competition ${compId}`);

        return await getCompetitionMatches(compId);
      })
    );
    // fetch all competition matches, and store them in the database
  }, interval);
};

/** Stop the fetching loop */
export const killFetcher = () => {
  fetcher ? clearInterval(fetcher) : null;
};
