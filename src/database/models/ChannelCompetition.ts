import { Document, model, Schema } from 'mongoose';

export interface IChannelCompetition extends Document {
  leagueName: string;
  competitionName: string;
  /** Discord channel id */
  channelId: string;
  applicationId: string;
}

export const ChannelCompetition = new Schema({
  leagueName: String,
  competitionName: String,
  channelId: String,
  applicationId: String,
});

export default model<IChannelCompetition>(
  'channelCompetition',
  ChannelCompetition
);
