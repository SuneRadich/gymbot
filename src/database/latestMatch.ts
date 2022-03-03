import { CollectContent, Root, Scraper } from 'nodejs-web-scraper';
import { buildMatchReport, sendMatchReport } from '../modules/sendMatchReport';
import { mapCols } from '../utils/mapCols';
import MatchModel, { IGame, IMatch } from './models/MatchModel';

/**
 * Check if a match (2 entries) exist in the database already
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
 * @param id
 * @returns
 */
const fetchMatchById = async (id: string): Promise<IGame | null> => {
  console.log('Fetching by id', id);
  const config = {
    baseSiteUrl: `https://www.mordrek.com:666/api/v1/queries?req=`,
    startUrl: `https://www.mordrek.com:666/api/v1/queries?req={%22matchTeams%22:{%22id%22:%22matchTeams%22,%22idmap%22:{%22idmatch%22:%22${id}%22},%22filters%22:null,%22ordercol%22:%22home%22,%22order%22:%22asc%22,%22limit%22:50,%22from%22:0,%22group%22:null,%22aggr%22:null}}`,
    //filePath: "./images/",
    //logPath: "./logs/",
  };

  const scraper = new Scraper(config);
  const root = new Root();

  const data = new CollectContent('body', {
    name: 'data',
    contentType: 'text',
    //getElementList: (elementList, pageAddress) => {
    //console.log("elmlist", elementList, pageAddress);
    //},
    //getElementContent: (elementContentString, pageAddress) => {
    //console.log(elementContentString);
    //},
  });

  root.addOperation(data);

  await scraper.scrape(root);

  const scrapedData = root.getData();
  const parsed = JSON.parse(scrapedData.data[0].data);
  const matchData = parsed.response.matchTeams.result;

  const { cols, rows } = matchData;

  const result = rows.map((row: string[]) => {
    return mapCols(cols, row);
  });

  let toDb: IGame = {
    finished: result[0].finished,
    competitionId: result[0].idcompetition,
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
export const getCompetitionMatches = async () => {
  const config = {
    baseSiteUrl: `https://www.mordrek.com:666/api/v1/queries?req=`,
    startUrl: `https://www.mordrek.com:666/api/v1/queries?req={%22compResults%22:{%22id%22:%22compResults%22,%22idmap%22:{%22idcompetition%22:%2242122%22},%22filters%22:null,%22ordercol%22:%22finished%22,%22order%22:%22desc%22,%22limit%22:30,%22from%22:0,%22group%22:null,%22aggr%22:null}}`,
    //filePath: "./images/",
    //logPath: "./logs/",
  };

  const scraper = new Scraper(config);
  const root = new Root();

  const data = new CollectContent('body', {
    name: 'data',
    contentType: 'text',
    //getElementList: (elementList, pageAddress) => {
    //console.log("elmlist", elementList, pageAddress);
    //},
    //getElementContent: (elementContentString, pageAddress) => {
    //console.log(elementContentString);
    //},
  });

  root.addOperation(data);

  await scraper.scrape(root);

  const scrapedData = root.getData();
  const parsed = JSON.parse(scrapedData.data[0].data);
  const matchOverview = parsed.response.compResults.result.rows;

  await Promise.all(
    matchOverview.map(async (match: any[]) => {
      // We know the first row item is the match Id
      const matchId = match[0];

      // Store the match data
      let matchData = await fetchMatchById(matchId);

      //console.log('matchdata to save', matchData);
      // check if the match id already exist in the database
      if (await checkIfMatchExist(matchId)) {
        // We already have it, no need to add again
        // console.log(`Match with id:${matchId} already in database`);
        matchData = null;
      } else {
        console.log(`Match with id: ${matchId} not found in database, adding`);

        // temp remove adding to db
        await MatchModel.create(matchData);

        const report = await buildMatchReport(matchData);
        sendMatchReport(report);
      }
    })
  );

  return null;
};

(async () => {
  // fetch all competition matches, and store them in the database
  await getCompetitionMatches();
  // process.exit(0);
})();
