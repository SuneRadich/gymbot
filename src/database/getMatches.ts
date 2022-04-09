import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { IMatchResponse } from '../interfaces/MatchReponse';
import { buildMatchReport, sendMatchReport } from '../modules/sendMatchReport';
import { logger } from '../utils/logger';
import { connectDatabase } from './connectDatabase';
import { IChannelCompetition } from './models/ChannelCompetition';
import MatchModel from './models/MatchModel';

export const fetchMatches = async (config: IChannelCompetition) => {
  //await connectDatabase();

  if (!config) {
    logger.error('fetchMaches: No competition given!');
    return new Promise(() => []);
  }

  const { leagueName, competitionName, channelId } = config;

  const api_key = process.env.CYANIDE_API_KEY;

  const url = `https://web.cyanide-studio.com/ws/bb/matches/?key=${api_key}&platform=pc&league=${leagueName}&competition=${competitionName}&bb=2&order=started&id_only=0`;

  const response = await fetch(url);

  const data = (await response.json()) as IMatchResponse;

  data.matches.map(
    async (match) =>
      await MatchModel.updateOne(
        { uuid: match.uuid },
        { ...match },
        { upsert: true, new: true }
      ).then(async (result) => {
        if (result.upsertedId) {
          const report = await buildMatchReport(match);
          sendMatchReport(report, channelId);
        }
      })
  );

  // Add each row in the standings to the database

  return data;
};
