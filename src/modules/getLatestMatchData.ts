import MatchModel from '../database/models/MatchModel';

export const getLatestMatchData = async () => {
  const matchData = await MatchModel.find().sort('-finished').limit(1);

  return matchData;
};
