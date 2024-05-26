// types.ts

export type PlayerStats = {
  rank: number;
  firstname: string;
  surname: string;
  athleteid: string;
  finishtime: string;
  raceprogress: string;
  teamname: string;
  bibnumber: string;
  flag: string;
  countryname: string;
  timeDifference?: string;
  flagUrl?: string | null;
};

export type ResultsData = {
  results: {
    raceStatus: string;
    gender: string;
    racename: string;
    tod: string;
    lastupdated: string;
    racelength: number;
    athletes: PlayerStats[];
  };
};
