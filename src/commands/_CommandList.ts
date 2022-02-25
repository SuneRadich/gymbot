import { ICommand } from '../interfaces/Command';
import { match } from './match';
import { skill } from './skill';

export const CommandList: ICommand[] = [skill, match];
