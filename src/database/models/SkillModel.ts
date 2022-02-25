import { Document, model, Schema } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  id: string;
}

export const Skill = new Schema({
  name: String,
  id: String,
});

export default model<ISkill>('skill', Skill);
