import StandingsModel, { IStanding } from '../database/models/StandingsModel';
import { fetchStandings } from '../database/standings';
import { trimTeamName } from '../utils/trimTeamName';

export const getStandings = async () => {
  console.log('getting standings');
  // Retrieve all standings, sorted by position
  let result = await StandingsModel.find({}).sort('position');

  // nothing in the database
  if (result.length === 0) {
    // fetch data
    await fetchStandings(42122);
    // and select it again from the DB
    result = await StandingsModel.find({}).sort('position');
  }
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
