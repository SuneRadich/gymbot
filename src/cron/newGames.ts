import { connectDatabase } from '../database/connectDatabase';
import { fetchMatches } from '../database/getMatches';
import ChannelCompetition from '../database/models/ChannelCompetition';
import { logger } from '../utils/logger';

/** Interval */
let fetcher: NodeJS.Timer | null = null;

const numberOfMinutes = 1;
const interval = numberOfMinutes * 60 * 1000;

/** Start a fetching loop, that runs every {interval} miliseconds, and fetches matches from GoblinSpy */
export const startFetcher = async () => {
  const competitions = await ChannelCompetition.find({});

  // logger.info(`Started fetching new match loop: ${competitionNames}`);

  // Can be enabled to force fetching data on bot start
  // should be replaced by a slash admin command
  //await getCompetitionMatches(competitionId);

  fetcher = setInterval(async () => {
    await Promise.all(
      competitions.map(async (competition) => {
        logger.info(
          `Fetching competition matches for competition ${competition.competitionName}`
        );

        // fetch all competition matches, and store them in the database
        return await fetchMatches(competition);
      })
    );
  }, interval);
};

/** Stop the fetching loop */
export const killFetcher = () => {
  fetcher ? clearInterval(fetcher) : null;
};
