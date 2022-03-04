import { CollectContent, Root, Scraper } from 'nodejs-web-scraper';
import { client } from '../index';
import { logger } from '../utils/logger';
import StandingsModel, { IStanding } from './models/StandingsModel';

client;
export const fetchStandings = async (competitionId: number) => {
  // TODO
  competitionId = 42122;

  const config = {
    baseSiteUrl: `https://www.mordrek.com:666/api/v1/queries?req=`,
    startUrl: `https://www.mordrek.com:666/api/v1/queries?req={%22compStandings%22:{%22id%22:%22compStandings%22,%22idmap%22:{%22idcompetition%22:%22${competitionId}%22}}}`,
    showConsoleLogs: false,
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
  const standings = parsed.response.compStandings.result;

  const formatData = (data: any): IStanding[] => {
    return data.rows.map((res: any) => {
      const [
        idstanding,
        idcompetition,
        ranking,
        points,
        sorting,
        active,
        wins,
        draws,
        losses,
        td,
        td_opp,
        td_diff,
        cas,
        cas_opp,
        cas_diff,
        concedes,
        team_value,
        kills,
        position,
        gp,
        idteam,
        idrace,
        team_name,
        logo,
        twitch,
        youtube,
        idcoach,
        coach_name,
      ] = res;

      return {
        idstanding,
        idcompetition,
        ranking,
        points,
        sorting,
        active,
        wins,
        draws,
        losses,
        td,
        td_opp,
        td_diff,
        cas,
        cas_opp,
        cas_diff,
        concedes,
        team_value,
        kills,
        position,
        gp,
        idteam,
        idrace,
        team_name,
        logo,
        twitch,
        youtube,
        idcoach,
        coach_name,
      };
    });
  };

  const a = formatData(standings);

  await StandingsModel.deleteMany({});

  a.map(async (standing) => {
    logger.info(`Added standings for ${standing.team_name}`);
    await StandingsModel.create(standing);
  });

  /*
  await Promise.all(
    a.map(async (standing) => {
      logger.info(standing.idstanding, 'standig');
      // The selection criteria to find the record
      const filter = {
        idstanding: standing.idstanding,
      };

      // Fields to select when querying the database
      const projection = 'idstanding';

      // Find the document
      StandingsModel.findOne(filter, projection, (error, result) => {
        if (!error) {
          // If the document doesn't exist
          if (!result) {
            logger.info(
              `Creating new standing model for ${standing.idstanding}`
            );
            // Create it
            result = new StandingsModel(standing);
          }
          // Save the document
          result.save((error) => {
            if (!error) {
              logger.info('no error');
              // Do something with the document
            } else {
              logger.error(error, 'some error');
              throw error;
            }
          });
        } else {
          logger.error(error);
        }
      });
    })
  ); */

  return a;
};
