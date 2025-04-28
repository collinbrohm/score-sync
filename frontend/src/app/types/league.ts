export type SportType = 'basketball';

export interface LeagueSettings {
  sport: SportType;
  name: string;
  location: string;
  season: string;
  startDate: string;
  endDate: string;
}

export interface BasketballSettings {
  quarterLength: number;
  shotClockLength: number;
  overtimeLength: number;
  foulsPerQuarter: number;
  useThreePointLine: boolean;
  useBonus: boolean;
}

export interface Team {
  id: string;
  name: string;
  contactName: string;
  contactEmail: string;
}

export interface SchedulePreference {
  dayOfWeek: string[];
  timeOfDay: string[];
  gamesPerWeek: number;
}

export interface LeagueAdministrator {
  name: string;
  email: string;
  phone: string;
}

export interface LeagueFormData {
  leagueSettings: LeagueSettings;
  basketballSettings: BasketballSettings;
  teams: Team[];
  schedulePreference: SchedulePreference;
  administrator: LeagueAdministrator;
  rules: string;
}