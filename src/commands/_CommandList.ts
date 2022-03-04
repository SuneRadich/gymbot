import { ICommand } from '../interfaces/Command';
import { match } from './match';
import { skill } from './skill';
import { latest } from './standings';

export const CommandList: ICommand[] = [skill, match, latest];
