import { Document, model, Schema } from 'mongoose';

export interface IChannelCompetition extends Document {
  competitionId: string;
  channelId: string;
}

export const ChannelCompetition = new Schema({
  competitionId: Number,
  channelId: Number,
});

export default model<IChannelCompetition>(
  'channelCompetition',
  ChannelCompetition
);
