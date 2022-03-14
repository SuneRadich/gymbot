import { Document, model, Schema } from 'mongoose';

export interface IChannelCompetition extends Document {
  competitionId: number;
  channelId: string;
  applicationId: string;
}

export const ChannelCompetition = new Schema({
  competitionId: Number,
  channelId: String,
  applicationId: String,
});

export default model<IChannelCompetition>(
  'channelCompetition',
  ChannelCompetition
);
