import { Document, model, Schema } from 'mongoose';

export interface IStanding extends Document {
  idstanding: string;
  idcompetition: string;
  ranking: string;
  points: string;
  sorting: string;
  active: string;
  wins: string;
  draws: string;
  losses: string;
  td: string;
  td_opp: string;
  td_diff: string;
  cas: string;
  cas_opp: string;
  cas_diff: string;
  concedes: string;
  team_value: string;
  kills: string;
  position: string;
  gp: string;
  idteam: string;
  idrace: string;
  team_name: string;
  logo: string;
  twitch: string;
  youtube: string;
  idcoach: string;
  coach_name: string;
}

export const Standing = new Schema({
  idstanding: String,
  idcompetition: String,
  ranking: String,
  points: String,
  sorting: String,
  active: String,
  wins: String,
  draws: String,
  losses: String,
  td: String,
  td_opp: String,
  td_diff: String,
  cas: String,
  cas_opp: String,
  cas_diff: String,
  concedes: String,
  team_value: String,
  kills: String,
  position: String,
  gp: String,
  idteam: String,
  idrace: String,
  team_name: String,
  logo: String,
  twitch: String,
  youtube: String,
  idcoach: String,
  coach_name: String,
});

export default model<IStanding>('standing', Standing);
