import { ICommand } from '../interfaces/Command';
import { match } from './match';
import { registerCompetition } from './register-competition';
import { latest } from './standings';

export const CommandList: ICommand[] = [registerCompetition, match, latest];
