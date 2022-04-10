import { ICommand } from '../interfaces/Command';
import { listCompetitions } from './list-competitions';
import { registerCompetition } from './register-competition';
import { sendInvite } from './send-invite';
import { latest } from './standings';

export const CommandList: ICommand[] = [
  registerCompetition,
  latest,
  sendInvite,
  listCompetitions,
];
