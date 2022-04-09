import { Document, model, Schema } from 'mongoose';

export interface ILeague extends Document {
  leagueName: string;
  competitionId: number[];
  /** Discord channel id */
  channelId: string;
  applicationId: string;
}

export const LeagueSubscription = new Schema({
  leagueName: String,
  competitionId: [Number],
  channelId: String,
  applicationId: String,
});

export default model<ILeague>('channelLeague', LeagueSubscription);
