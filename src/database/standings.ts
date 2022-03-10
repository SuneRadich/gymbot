import fetch from 'node-fetch';
import { Result } from '../interfaces/Result';
import { IStandingsResponse } from '../interfaces/StandingsResponse';
import { logger } from '../utils/logger';
import { mapCols } from '../utils/mapCols';
import StandingsModel from './models/StandingsModel';

export const fetchStandings = async (competitionId: number) => {
  if (!competitionId) {
    logger.error('fetchStandings: No competition id given!');
    return new Promise(() => []);
  }

  const url = `https://www.mordrek.com:666/api/v1/queries?req={%22compStandings%22:{%22id%22:%22compStandings%22,%22idmap%22:{%22idcompetition%22:%22${competitionId}%22}}}`;

  const response = await fetch(url);

  const data = (await response.json()) as IStandingsResponse;
  const { cols, rows } = data.response.compStandings.result;

  const standings = rows.map((row: Result) => {
    return mapCols(cols, row);
  });

  // Add each row in the standings to the database
  await Promise.all(
    standings.map(async (standing) => {
      logger.info(`Added standings for ${standing.team_name}`);

      // Update or insert standing in the database
      await StandingsModel.updateOne(
        { idteam: standing.idteam },
        { ...standing },
        { upsert: true }
      );
    })
  );

  return standings;
};
