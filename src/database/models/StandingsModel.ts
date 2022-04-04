import { Document, model, Schema } from 'mongoose';

export interface IStanding extends Document {
  league: string;
  competition: string;
  rank: number;
  name: string;
  id: number;
  tv: number;
  score: number;
  race_id: number;
  race: string;
  logo: string;
  win: number;
  draw: number;
  loss: number;
  coach: {
    name: string;
    id: number;
    lang: string;
    country: string;
  };
}

export const Standing = new Schema({
  league: String,
  competition: String,
  rank: Number,
  name: String,
  id: Number,
  tv: Number,
  score: Number,
  race_id: Number,
  race: String,
  logo: String,
  win: Number,
  draw: Number,
  loss: Number,
  coach: {
    name: String,
    id: Number,
    lang: String,
    country: String,
  },
});

export default model<IStanding>('standingCyanide', Standing);
