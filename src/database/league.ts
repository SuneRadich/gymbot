import fetch from 'node-fetch';
import { ILeagueResponse } from '../interfaces/LeagueResponse';
import { Result } from '../interfaces/Result';
import { logger } from '../utils/logger';
import { mapCols } from '../utils/mapCols';
import LeagueModel from './models/LeagueModel';

export const fetchLeagueData = async (leagueId: number) => {
  if (!leagueId) {
    logger.error('fetchStandings: No competition id given!');
    return new Promise(() => []);
  }

  const url = `https://www.mordrek.com:666/api/v1/queries?req={%22leagueComps%22:{%22id%22:%22leagueComps%22,%22idmap%22:{%22idleague%22:%22${leagueId}%22},%22filters%22:null,%22ordercol%22:%22active%20desc,last_game%22,%22order%22:%22desc%22,%22limit%22:null,%22from%22:0,%22group%22:null,%22aggr%22:null}}`;

  const response = await fetch(url);

  const data = (await response.json()) as ILeagueResponse;
  const { cols, rows } = data.response.leagueComps.result;

  const league = rows.map((row: Result) => {
    return mapCols(cols, row);
  });

  // Add each row in the standings to the database
  await Promise.all(
    league.map(async (competition) => {
      logger.info(
        `Added league details for for ${competition.competition_name}`
      );

      // Update or insert standing in the database
      await LeagueModel.updateOne(
        { idcompetition: competition.idcompetition },
        { ...competition },
        { upsert: true }
      );
    })
  );

  return league;
};
