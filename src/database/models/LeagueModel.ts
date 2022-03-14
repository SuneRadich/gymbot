import { Document, model, Schema } from 'mongoose';

export interface ILeague extends Document {
  idcompetition: string;
  idorigin: string;
  competition_origin_id: string;
  competition_name: string;
  idleague: string;
  active: string;
  format: string;
  last_game: string;
  num_coaches: string;
  num_teams: string;
  num_games: string;
  sorting: string;
  turn_duration: string;
  last_checked: string;
}

export const League = new Schema({
  idcompetition: String,
  idorigin: String,
  competition_origin_id: String,
  competition_name: String,
  idleague: String,
  active: String,
  format: String,
  last_game: String,
  num_coaches: String,
  num_teams: String,
  num_games: String,
  sorting: String,
  turn_duration: String,
  last_checked: String,
});

export default model<ILeague>('league', League);
