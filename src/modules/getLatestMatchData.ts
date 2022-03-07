import { getCompetitionMatches } from '../database/latestMatch';
import MatchModel from '../database/models/MatchModel';

export const getLatestMatchData = async () => {
  let matchData = await MatchModel.find().sort('-finished').limit(1);

  // nothing in the database
  if (matchData.length === 0) {
    // fetch data
    await getCompetitionMatches(46302);
    // and select it again from the DB
    matchData = await MatchModel.find({}).sort('-finished').limit(1);
  }

  return matchData;
};
