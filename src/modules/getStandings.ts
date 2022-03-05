import StandingsModel, { IStanding } from '../database/models/StandingsModel';
import { trimTeamName } from '../utils/trimTeamName';

export const getStandings = async () => {
  // Retrieve all standings, sorted by position
  const result = await StandingsModel.find({}).sort('position');

  // Trim all team names to remove trailing whitespace
  result.forEach((row) => {
    row.team_name = trimTeamName(row.team_name);
  });

  /**
   * Pad the string ofr team names with spaces, so that they have the same length as the longest
   * team name
   */
  const padAllTeamNames = (data: IStanding[]) => {
    const longest = data.reduce(function (a, b) {
      return a.team_name.length > b.team_name.length ? a : b;
    });

    data.forEach((row) => {
      const base = longest.team_name.trim();
      const diff = base.length - row.team_name.length;

      if (diff > 0) {
        const spacerLength = new Array(diff);

        let spacer = '';

        [...spacerLength].forEach(() => {
          spacer += ' ';
        });
        row.team_name += spacer;
      }
    });
  };

  padAllTeamNames(result);

  return result;
};
