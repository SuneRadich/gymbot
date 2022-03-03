import MatchModel from '../database/models/MatchModel';

export const getLatestMatchData = async () => {
  // TODO: Fetch on same finished value
  const matchData = await MatchModel.find().sort('-finished').limit(1);

  //const matchData = await MatchModel.find().sort('-finished').limit(2); //.exec(function(err, post) { ... });

  return matchData;
};
