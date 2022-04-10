import StandingsModelCyanide, {
  IStanding,
} from '../database/models/StandingsModel';
import { fetchStandings } from '../database/standings';
import { logger } from '../utils/logger';
import { padStringToLength } from '../utils/padStringToLength';
import { trimTeamName } from '../utils/trimTeamName';

export const getStandings = async (
  leagueName: string,
  competitionName: string
) => {
  if (!competitionName) {
    logger.error(`getStandings: No competition name given!`);
    return [];
  }
  // Retrieve all standings, sorted by rank
  let result = await StandingsModelCyanide.find({
    league: leagueName,
    competition: competitionName,
  }).sort('rank');

  // nothing in the database
  if (result.length === 0) {
    // fetch data
    await fetchStandings(leagueName, competitionName);
    // and select it again from the DB
    result = await StandingsModelCyanide.find({}).sort('rank');
  }
  // Trim all team names to remove trailing whitespace
  result.forEach((row) => {
    row.name = trimTeamName(row.name);
  });

  /**
   * Pad the team names with spaces, so that they have the same length as the longest
   * team name
   */
  const padAllTeamNames = (data: IStanding[]) => {
    const longest = data.reduce(function (a, b) {
      return a.name.length > b.name.length ? a : b;
    });

    // Pad team_name with spaces
    data.forEach((row) => {
      const base = longest.name.trim();

      row.name = padStringToLength(row.name, base.length, true);
    });
  };

  padAllTeamNames(result);

  return result;
};
