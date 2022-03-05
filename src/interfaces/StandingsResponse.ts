import { Cols } from './Cols';
import { Result } from './Result';

interface Idmap {
  idcompetition: string;
}

interface Request {
  id: string;
  idmap: Idmap;
  filters?: any;
  ordercol: string;
  order: string;
  limit: number;
  from: number;
  group?: any;
  aggr?: any;
}

export interface StandingsCols extends Cols {
  idstanding: number;
  idcompetition: number;
  ranking: number;
  points: number;
  sorting: number;
  active: number;
  wins: number;
  draws: number;
  losses: number;
  td: number;
  td_opp: number;
  td_diff: number;
  cas: number;
  cas_opp: number;
  cas_diff: number;
  concedes: number;
  team_value: number;
  kills: number;
  position: number;
  gp: number;
  idteam: number;
  idrace: number;
  team_name: number;
  logo: number;
  twitch: number;
  youtube: number;
  idcoach: number;
  coach_name: number;
}

interface StandingsResult {
  fileData?: any;
  cols: StandingsCols;
  rows: Result[];
  affected: number;
  timeMs: number;
  error?: any;
  success: boolean;
  from: number;
  limit: number;
  page: number;
}

interface CompStandings {
  request: Request;
  result: StandingsResult;
}

interface Response {
  compStandings: CompStandings;
}

export interface IStandingsResponse {
  response: Response;
  success: boolean;
  timeMs: number;
}
