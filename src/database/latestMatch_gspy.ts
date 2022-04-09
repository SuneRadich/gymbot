import fetch from 'node-fetch';
import { IMatchResponse } from '../interfaces/MatchResponse_gspy';
import { Result } from '../interfaces/Result';
import { mapCols } from '../utils/mapCols';
import MatchModel, { IGame, IMatch } from './models/MatchModel_gspy';

/**
 * Check if a match exist in the database already
 *
 * @param idmatch
 * @returns
 */
const checkIfMatchExist = async (matchId: string) => {
  const result = await MatchModel.find({ matchId }).limit(1).exec();

  return result.length === 1;
};

/**
 * Given an id, fetch the match details for that match
 * @param matchId
 * @returns
 */
const fetchMatchById = async (matchId: string): Promise<IGame | null> => {
  const url = `https://www.mordrek.com:666/api/v1/queries?req={%22matchTeams%22:{%22id%22:%22matchTeams%22,%22idmap%22:{%22idmatch%22:%22${matchId}%22},%22filters%22:null,%22ordercol%22:%22home%22,%22order%22:%22asc%22,%22limit%22:50,%22from%22:0,%22group%22:null,%22aggr%22:null}}`;

  const response = await fetch(url);
  const data = (await response.json()) as IMatchResponse;

  const matchData = data.response.matchTeams.result;

  const { cols, rows } = matchData;

  const result = rows.map((row: Result) => {
    return mapCols(cols, row);
  });

  const toDb: IGame = {
    finished: result[0].finished,
    competitionId: Number(result[0].idcompetition),
    matchId: result[0].idmatch,
    home: null,
    away: null,
  } as IGame;

  if (result[0].home === '1') {
    toDb.home = result[0] as IMatch;
    toDb.away = result[1] as IMatch;
  } else {
    toDb.home = result[1] as IMatch;
    toDb.away = result[0] as IMatch;
  }

  return toDb;
};

/**
 * Fetch matches from GoblinSpy and store in DB
 */
export const getCompetitionMatches = async (competitionName: string) => {
  const foundNewMatches = false;

  console.log('getCompetitionMatches dummy');
  /*
  if (!competitionName) {
    logger.error('getCompetitionMatches: No competition name given');
  }

  const url = `https://www.mordrek.com:666/api/v1/queries?req={%22compResults%22:{%22id%22:%22compResults%22,%22idmap%22:{%22idcompetition%22:%22${competitionId}%22},%22filters%22:null,%22ordercol%22:%22finished%22,%22order%22:%22desc%22,%22limit%22:30,%22from%22:0,%22group%22:null,%22aggr%22:null}}`;

  const response = await fetch(url);
  const data = (await response.json()) as ICompetitionResponse;

  const matchOverview = data.response.compResults.result.rows;

  await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    matchOverview.map(async (match: any[]) => {
      // We know the first row item is the match Id
      const matchId = match[0];

      // Store the match data
      let matchData = await fetchMatchById(matchId);

      // check if the match id already exist in the database
      if (await checkIfMatchExist(matchId)) {
        // We already have it, no need to add again
        matchData = null;
      } else {
        logger.info(`Match with id: ${matchId} not found in database, adding`);

        foundNewMatches = true;

        // Add new match to db
        await MatchModel.create(matchData);

        const competitionId = matchData?.competitionId;

        const botId = client.application?.id;

        const channel = await ChannelCompetition.findOne({
          competitionId: competitionId,
          applicationId: botId,
        });

        if (competitionId && channel?.channelId) {
          // Show the match in the chat
          const report = await buildMatchReport(matchData);
          report
            ? sendMatchReport(report, channel?.channelId)
            : logger.error('No report to send');
        }
      }
    })
  );

  if (foundNewMatches) {
    // We just added new matches, so fetch updated standings
    fetchStandings(competitionName);
  }
*/
  return null;
};
