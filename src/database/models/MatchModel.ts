import { Document, model, Schema } from 'mongoose';

export interface IMatch {
  idteammatchstat: string;
  home: string;
  td: string;
  td_opp: string;
  score: string;
  score_opp: string;
  win: string;
  loss: string;
  conceded: string;
  cash_before_match: string;
  cash_spent: string;
  cash_earned: string;
  popularity_before_match: string;
  popularity_gained: string;
  blocks_for: string;
  breaks_for: string;
  stuns_for: string;
  kos_for: string;
  casualties_for: string;
  kills_for: string;
  blocks_against: string;
  breaks_against: string;
  stuns_against: string;
  kos_against: string;
  casualties_against: string;
  kills_against: string;
  passes: string;
  catches: string;
  completions: string;
  pushouts: string;
  turnovers: string;
  pass_meters: string;
  run_meters: string;
  occ_own: string;
  occ_their: string;
  interceptions: string;
  deflections: string;
  expulsions: string;
  cheerleaders: string;
  apo: string;
  rerolls: string;
  asscoaches: string;
  possession: string;
  draw: string;
  mvp: string;
  team_value: string;
  dodges: string;
  fouls: string;
  supporters: string;
  teammatchstat_origin_id: string;
  dodges_failed: string;
  passes_failed: string;
  catches_failed: string;
  rushes: string;
  rushes_failed: string;
  risk: string;
  luck: string;
  pickups: string;
  pickups_failed: string;
  sacks: string;
  boneheads: string;
  idmatch: string;
  match_origin_id: string;
  started: string;
  finished: string;
  duration: string;
  idteam_home: string;
  idteam_away: string;
  idstadium: string;
  workstatus: string;
  idteam: string;
  team_origin_id: string;
  team_name: string;
  idrace: string;
  idmotto: string;
  idlogo: string;
  logo: string;
  idcoach: string;
  coach_origin_id: string;
  coach_name: string;
  twitch: string;
  youtube: string;
  country: string;
  lang: string;
  idcompetition: string;
  idorigin: string;
  competition_origin_id: string;
}

export interface IGame extends Document {
  matchId: string;
  competitionId: string;
  finished: string;
  home: IMatch | null;
  away: IMatch | null;
}

export const Match = new Schema({
  matchId: String,
  finished: String,
  competition: String,
  home: {
    idteammatchstat: String,
    home: String,
    td: String,
    td_opp: String,
    score: String,
    score_opp: String,
    win: String,
    loss: String,
    conceded: String,
    cash_before_match: String,
    cash_spent: String,
    cash_earned: String,
    popularity_before_match: String,
    popularity_gained: String,
    blocks_for: String,
    breaks_for: String,
    stuns_for: String,
    kos_for: String,
    casualties_for: String,
    kills_for: String,
    blocks_against: String,
    breaks_against: String,
    stuns_against: String,
    kos_against: String,
    casualties_against: String,
    kills_against: String,
    passes: String,
    catches: String,
    completions: String,
    pushouts: String,
    turnovers: String,
    pass_meters: String,
    run_meters: String,
    occ_own: String,
    occ_their: String,
    interceptions: String,
    deflections: String,
    expulsions: String,
    cheerleaders: String,
    apo: String,
    rerolls: String,
    asscoaches: String,
    possession: String,
    draw: String,
    mvp: String,
    team_value: String,
    dodges: String,
    fouls: String,
    supporters: String,
    teammatchstat_origin_id: String,
    dodges_failed: String,
    passes_failed: String,
    catches_failed: String,
    rushes: String,
    rushes_failed: String,
    risk: String,
    luck: String,
    pickups: String,
    pickups_failed: String,
    sacks: String,
    boneheads: String,
    idmatch: String,
    match_origin_id: String,
    started: String,
    finished: String,
    duration: String,
    idteam_home: String,
    idteam_away: String,
    idstadium: String,
    workstatus: String,
    idteam: String,
    team_origin_id: String,
    team_name: String,
    idrace: String,
    idmotto: String,
    idlogo: String,
    logo: String,
    idcoach: String,
    coach_origin_id: String,
    coach_name: String,
    twitch: String,
    youtube: String,
    country: String,
    lang: String,
    idcompetition: String,
    idorigin: String,
    competition_origin_id: String,
  },
  away: {
    idteammatchstat: String,
    home: String,
    td: String,
    td_opp: String,
    score: String,
    score_opp: String,
    win: String,
    loss: String,
    conceded: String,
    cash_before_match: String,
    cash_spent: String,
    cash_earned: String,
    popularity_before_match: String,
    popularity_gained: String,
    blocks_for: String,
    breaks_for: String,
    stuns_for: String,
    kos_for: String,
    casualties_for: String,
    kills_for: String,
    blocks_against: String,
    breaks_against: String,
    stuns_against: String,
    kos_against: String,
    casualties_against: String,
    kills_against: String,
    passes: String,
    catches: String,
    completions: String,
    pushouts: String,
    turnovers: String,
    pass_meters: String,
    run_meters: String,
    occ_own: String,
    occ_their: String,
    interceptions: String,
    deflections: String,
    expulsions: String,
    cheerleaders: String,
    apo: String,
    rerolls: String,
    asscoaches: String,
    possession: String,
    draw: String,
    mvp: String,
    team_value: String,
    dodges: String,
    fouls: String,
    supporters: String,
    teammatchstat_origin_id: String,
    dodges_failed: String,
    passes_failed: String,
    catches_failed: String,
    rushes: String,
    rushes_failed: String,
    risk: String,
    luck: String,
    pickups: String,
    pickups_failed: String,
    sacks: String,
    boneheads: String,
    idmatch: String,
    match_origin_id: String,
    started: String,
    finished: String,
    duration: String,
    idteam_home: String,
    idteam_away: String,
    idstadium: String,
    workstatus: String,
    idteam: String,
    team_origin_id: String,
    team_name: String,
    idrace: String,
    idmotto: String,
    idlogo: String,
    logo: String,
    idcoach: String,
    coach_origin_id: String,
    coach_name: String,
    twitch: String,
    youtube: String,
    country: String,
    lang: String,
    idcompetition: String,
    idorigin: String,
    competition_origin_id: String,
  },
});

export default model<IGame>('match', Match);