import { fetchLeagueData } from '../database/league';
import LeagueModel from '../database/models/LeagueModel';
import { logger } from '../utils/logger';

export const getLeague = async (leagueId: number) => {
  if (!leagueId) {
    logger.error(`getLeague: No league id given!`);
    return [];
  }

  // Retrieve all standings, sorted by position
  let result = await LeagueModel.find({ idleague: leagueId }).sort('sorting');

  // nothing in the database
  if (result.length === 0) {
    // fetch data
    await fetchLeagueData(leagueId);
    // and select it again from the DB
    result = await LeagueModel.find({ idleague: leagueId }).sort('sorting');
  }

  return result;
};
