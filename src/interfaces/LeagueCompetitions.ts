export interface ILeagueCompetitions {
  competitions: Competition[];
  leagues: League[];
  urls: Urls;
  context: Context;
  meta: Meta;
}

export interface Competition {
  id: number;
  name: string;
  date_created: string;
  format: string;
  status: number;
  teams_max: number;
  teams_count: number;
  rounds_count: number;
  round: number;
  turn_duration: number;
  league: League;
}

export interface League {
  id: number;
  name: string;
  date_created: string;
  official: number;
  logo: string;
  registered_teams_count: number;
}

export interface Urls {
  images: Images;
}

export interface Images {
  logos: string;
  races: string;
  portraits: string;
  skills: string;
  stadiums: string;
}

export interface Context {
  leagues: string[];
}

export interface Meta {
  user: string;
  game: string;
  method: string;
  format: string;
}
