import MatchModel from '../database/models/MatchModel';

export const getLatestMatchData = async () => {
  const matchData = await MatchModel.findOne()
    .sort({ field: 'finished', _id: -1 })
    .limit(1);

  return matchData;
};
