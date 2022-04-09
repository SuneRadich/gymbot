import { getCompetitionMatches } from '../database/latestMatch_gspy';
import ChannelCompetition from '../database/models/ChannelCompetition';
import MatchModel from '../database/models/MatchModel_gspy';
import { logger } from '../utils/logger';

export const getLatestMatchData = async () => {
  let matchData = await MatchModel.find().sort('-finished').limit(1);
  const channelCompetitions = await ChannelCompetition.find({});

  // Loop over all channel registrations, and fetch the corresponding data
  channelCompetitions.forEach(async (channelCompetition) => {
    // nothing in the database
    if (matchData.length === 0) {
      // fetch data
      await getCompetitionMatches(channelCompetition.competitionName);
      // and select it again from the DB
      matchData = await MatchModel.find({}).sort('-finished').limit(1);
    }
  });

  if (channelCompetitions.length === 0) {
    logger.error('No competitions in the database! Nothing to get');
    return [];
  }

  return matchData;
};

// (async () => await getLatestMatchData())();
