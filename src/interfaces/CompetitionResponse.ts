export interface Idmap {
  idcompetition: string;
}

export interface Request {
  id: string;
  idmap: Idmap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters?: any;
  ordercol: string;
  order: string;
  limit: number;
  from: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  group?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  aggr?: any;
}

export interface Cols {
  idmatch: number;
  idorigin: number;
  idcompetition: number;
  started: number;
  finished: number;
  idteam_home: number;
  team_name_home: number;
  logo_home: number;
  idteam_away: number;
  team_name_away: number;
  logo_away: number;
  idcoach_home: number;
  coach_name_home: number;
  idcoach_away: number;
  coach_name_away: number;
  score_home: number;
  score_away: number;
  cas_home: number;
  cas_away: number;
  conceded_home: number;
  conceded_away: number;
  team_value_home: number;
  team_value_away: number;
  round: number;
}

export interface Result {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileData?: any;
  cols: Cols;
  rows: string[][];
  affected: number;
  timeMs: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  success: boolean;
  from: number;
  limit: number;
  page: number;
}

export interface CompResults {
  request: Request;
  result: Result;
}

export interface Response {
  compResults: CompResults;
}

export interface ICompetitionResponse {
  response: Response;
  success: boolean;
  timeMs: number;
}
