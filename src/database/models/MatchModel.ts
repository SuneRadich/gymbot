import { Document, model, Schema } from 'mongoose';
import { Coach, IMatchResponse, Team } from '../../interfaces/MatchReponse';

export interface IMatch extends Document, IMatchResponse {
  uuid: string;
  id: number;
  idleague: number;
  leaguename: string;
  idcompetition: number;
  competitionname: string;
  stadium: string;
  levelstadium: number;
  structstadium: string;
  started: string;
  finished: string;
  round: number;
  coaches: Coach[];
  teams: Team[];
}

export const Match = new Schema({
  uuid: String,
  id: Number,
  idleague: Number,
  leaguename: String,
  idcompetition: Number,
  competitionname: String,
  stadium: String,
  levelstadium: Number,
  structstadium: String,
  started: String,
  finished: String,
  round: Number,
  coaches: [
    {
      idcoach: Number,
      coachname: String,
      coachcyanearned: Number,
      coachxpearned: Number,
    },
  ],
  teams: [
    {
      idteamlisting: Number,
      idcoach: Number,
      idraces: Number,
      teamname: String,
      teamlogo: String,
      value: Number,
      score: Number,
      cashbeforematch: Number,
      popularitybeforematch: Number,
      popularitygain: Number,
      cashspentinducements: Number,
      cashearned: Number,
      cashearnedbeforeconcession: Number,
      winningsdice: Number,
      spirallingexpenses: Number,
      nbsupporters: Number,
      possessionball: Number,
      occupationown: Number,
      occupationtheir: Number,
      mvp: Number,
      inflictedpasses: Number,
      inflictedcatches: Number,
      inflictedinterceptions: Number,
      inflictedtouchdowns: Number,
      inflictedcasualties: Number,
      inflictedtackles: Number,
      inflictedko: Number,
      inflictedinjuries: Number,
      inflicteddead: Number,
      inflictedmetersrunning: Number,
      inflictedmeterspassing: Number,
      inflictedpushouts: Number,
      sustainedexpulsions: Number,
      sustainedcasualties: Number,
      sustainedko: Number,
      sustainedinjuries: Number,
      sustaineddead: Number,
      current: {
        cheerleaders: Number,
        apothecary: Number,
        rerolls: Number,
        assistantcoaches: Number,
      },
    },
  ],
});

export default model<IMatch>('match', Match);
