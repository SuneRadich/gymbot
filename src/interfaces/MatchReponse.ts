export interface IMatchResponse {
  matches: Match[];
  urls: Urls;
  meta: Meta;
}

export interface Match {
  uuid: string;
  id: number;
  idleague: number;
  leaguename: string;
  idcompetition: number;
  competitionname: string;
  stadium: string;
  levelstadium: number;
  structstadium: string;
  started: string;
  finished: string;
  round: number;
  coaches: Coach[];
  teams: Team[];
}

export interface Coach {
  idcoach: number;
  coachname: string;
  coachcyanearned: number;
  coachxpearned: number;
}

export interface Team {
  idteamlisting: number;
  idcoach: number;
  idraces: number;
  teamname: string;
  teamlogo: string;
  value: number;
  score: number;
  cashbeforematch: number;
  popularitybeforematch: number;
  popularitygain: number;
  cashspentinducements: number;
  cashearned: number;
  cashearnedbeforeconcession: number;
  winningsdice: number;
  spirallingexpenses: number;
  nbsupporters: number;
  possessionball: number;
  occupationown: number;
  occupationtheir: number;
  mvp: number;
  inflictedpasses: number;
  inflictedcatches: number;
  inflictedinterceptions: number;
  inflictedtouchdowns: number;
  inflictedcasualties: number;
  inflictedtackles: number;
  inflictedko: number;
  inflictedinjuries: number;
  inflicteddead: number;
  inflictedmetersrunning: number;
  inflictedmeterspassing: number;
  inflictedpushouts: number;
  sustainedexpulsions: number;
  sustainedcasualties: number;
  sustainedko: number;
  sustainedinjuries: number;
  sustaineddead: number;
  current: Current;
}

export interface Current {
  cheerleaders: number;
  apothecary: number;
  rerolls: number;
  assistantcoaches: number;
}

export interface Urls {
  images: Images;
  rss: Rss;
}

export interface Images {
  logos: string;
  races: string;
  portraits: string;
  skills: string;
  stadiums: string;
}

export interface Rss {
  league: string;
}

export interface Meta {
  user: string;
  game: string;
  method: string;
  format: string;
}
