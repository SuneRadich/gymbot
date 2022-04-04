export interface IStandingsResponse {
  ranking: Ranking[];
  ladder: Ladder;
  meta: Meta;
}

export interface Ranking {
  team: Team;
  coach: Coach;
}

export interface Team {
  rank: number;
  name: string;
  id: number;
  tv: number;
  score: number;
  race_id: number;
  race: string;
  logo: string;
  'w/d/l': string;
}

export interface Coach {
  name: string;
  id: number;
  lang?: string;
  country: string;
}

export interface Ladder {
  league: string;
  league_id: number;
  competition: string;
  competition_id: number;
  id: number;
  size: string;
}

export interface Meta {
  user: string;
  game: string;
  method: string;
  format: string;
}
