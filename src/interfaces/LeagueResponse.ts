import { Cols } from './Cols';
import { Result } from './Result';

export interface Idmap {
  idleague: string;
}

export interface Request {
  id: string;
  idmap: Idmap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters?: any;
  ordercol: string;
  order: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  limit?: any;
  from: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  group?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  aggr?: any;
}

export interface LeagueCols extends Cols {
  idcompetition: number;
  idorigin: number;
  competition_origin_id: number;
  competition_name: number;
  idleague: number;
  active: number;
  format: number;
  last_game: number;
  num_coaches: number;
  num_teams: number;
  num_games: number;
  sorting: number;
  turn_duration: number;
  last_checked: number;
}

export interface LeagueResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileData?: any;
  cols: LeagueCols;
  rows: Result[];
  affected: number;
  timeMs: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  success: boolean;
  from: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  limit?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page?: any;
}

export interface LeagueComps {
  request: Request;
  result: LeagueResult;
}

export interface Response {
  leagueComps: LeagueComps;
}

export interface ILeagueResponse {
  response: Response;
  success: boolean;
  timeMs: number;
}
