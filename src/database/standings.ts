import fetch from 'node-fetch';
import { IStandingsResponse, Ranking } from '../interfaces/StandingsResponse';
import { logger } from '../utils/logger';
import { connectDatabase } from './connectDatabase';
import StandingsModelCyanide from './models/StandingsModel';

export const fetchStandings = async (league: string, competition: string) => {
  await connectDatabase();

  if (!competition || !league) {
    logger.error('fetchStandings: No competition and/or league name given!');
    return new Promise(() => []);
  }

  const api_key = process.env.CYANIDE_API_KEY;

  const url = `https://web.cyanide-studio.com/ws/bb/ladder/?key=${api_key}&platform=pc&league=${league}&competition=${competition}&ladder_size=100`;

  const response = await fetch(url);

  const standings = (await response.json()) as IStandingsResponse;

  // Add each row in the standings to the database
  await Promise.all(
    standings.ranking.map(async (standing: Ranking) => {
      const [win, draw, loss] = standing.team['w/d/l'].split('/');

      const data = {
        league: league,
        competition: competition,
        ...standing.team,
        win,
        draw,
        loss,
        coach: standing.coach,
      };

      logger.info(`Added standings for ${data.name}`);

      // Update or insert standing in the database
      await StandingsModelCyanide.updateOne(
        { id: data.id },
        { ...data },
        { upsert: true }
      );
    })
  );

  return standings;
};
