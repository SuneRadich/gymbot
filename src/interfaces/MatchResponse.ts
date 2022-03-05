import { Cols } from './Cols';
import { Result } from './Result';
export interface Idmap {
  idmatch: string;
}

export interface Request {
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
export interface MatchCols extends Cols {
  idteammatchstat: number;
  idmatch: number;
  idteam: number;
  idcompetition: number;
  home: number;
  td: number;
  td_opp: number;
  score: number;
  score_opp: number;
  win: number;
  loss: number;
  conceded: number;
  cash_before_match: number;
  cash_spent: number;
  cash_earned: number;
  popularity_before_match: number;
  popularity_gained: number;
  blocks_for: number;
  breaks_for: number;
  stuns_for: number;
  kos_for: number;
  casualties_for: number;
  kills_for: number;
  blocks_against: number;
  breaks_against: number;
  stuns_against: number;
  kos_against: number;
  casualties_against: number;
  kills_against: number;
  passes: number;
  catches: number;
  completions: number;
  pushouts: number;
  turnovers: number;
  pass_meters: number;
  run_meters: number;
  occ_own: number;
  occ_their: number;
  interceptions: number;
  deflections: number;
  expulsions: number;
  cheerleaders: number;
  apo: number;
  rerolls: number;
  asscoaches: number;
  possession: number;
  draw: number;
  mvp: number;
  team_value: number;
  dodges: number;
  fouls: number;
  supporters: number;
  idorigin: number;
  teammatchstat_origin_id: number;
  dodges_failed: number;
  passes_failed: number;
  catches_failed: number;
  rushes: number;
  rushes_failed: number;
  risk: number;
  luck: number;
  pickups: number;
  pickups_failed: number;
  sacks: number;
  boneheads: number;
  match_origin_id: number;
  started: number;
  finished: number;
  duration: number;
  idteam_home: number;
  idteam_away: number;
  idstadium: number;
  workstatus: number;
  team_origin_id: number;
  team_name: number;
  idrace: number;
  idcoach: number;
  idlogo: number;
  idmotto: number;
  active: number;
  logo: number;
  coach_origin_id: number;
  coach_name: number;
  twitch: number;
  youtube: number;
  country: number;
  lang: number;
  competition_origin_id: number;
  competition_name: number;
  idleague: number;
  format: number;
  last_game: number;
  num_coaches: number;
  num_teams: number;
  num_games: number;
  sorting: number;
  turn_duration: number;
  last_checked: number;
}

export interface MatchResult {
  fileData?: any;
  cols: Cols;
  rows: Result[];
  affected: number;
  timeMs: number;
  error?: any;
  success: boolean;
  from: number;
  limit: number;
  page: number;
}

export interface MatchTeams {
  request: Request;
  result: MatchResult;
}

export interface Response {
  matchTeams: MatchTeams;
}

export interface IMatchResponse {
  response: Response;
  success: boolean;
  timeMs: number;
}
