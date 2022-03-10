import StandingsModel, { IStanding } from '../database/models/StandingsModel';
import { fetchStandings } from '../database/standings';
import { logger } from '../utils/logger';
import { padStringToLength } from '../utils/padStringToLength';
import { trimTeamName } from '../utils/trimTeamName';

export const getStandings = async (competitionId: number) => {
  if (!competitionId) {
    logger.error(`getStandings: No competition id given!`);
    return [];
  }
  // Retrieve all standings, sorted by position
  let result = await StandingsModel.find({ idcompetition: competitionId }).sort(
    'position'
  );

  // nothing in the database
  if (result.length === 0) {
    // fetch data
    await fetchStandings(competitionId);
    // and select it again from the DB
    result = await StandingsModel.find({}).sort('position');
  }
  // Trim all team names to remove trailing whitespace
  result.forEach((row) => {
    row.team_name = trimTeamName(row.team_name);
  });

  /**
   * Pad the team names with spaces, so that they have the same length as the longest
   * team name
   */
  const padAllTeamNames = (data: IStanding[]) => {
    const longest = data.reduce(function (a, b) {
      return a.team_name.length > b.team_name.length ? a : b;
    });

    // Pad team_name with spaces
    data.forEach((row) => {
      const base = longest.team_name.trim();

      row.team_name = padStringToLength(row.team_name, base.length, true);
    });
  };

  padAllTeamNames(result);

  return result;
};
