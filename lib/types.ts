export type Intimidation = "low" | "medium" | "high";

export interface WinLoss {
  wins: number;
  losses: number;
  currentStreak: number;
}

export interface Rank {
  court?: number;
  neighborhood?: number;
  borough?: number;
  city?: number;
  global?: number;
}

export interface Team {
  name: string;
  roster: number;
  members?: string[];
  homeCourt?: string;
  combinedRecord?: string;
}

export interface User {
  nickname: string;
  realName: string | null;
  record: WinLoss;
  homeCourt: string;
  neighborhood: string;
  city: string;
  team: Team;
  signatureStats: {
    fadeaway: string;
    crossover: string;
    closeOut: string;
  };
  rank: Rank;
  earnedDrops: number;
  totalGames: number;
  joined: string;
}

export interface Opponent {
  id: string;
  nickname: string;
  record: WinLoss;
  homeCourt: string;
  rank: Rank;
  intimidation: Intimidation;
  signatureStats?: {
    fadeaway: string;
    crossover: string;
    closeOut: string;
  };
}

export interface Court {
  id: string;
  name: string;
  neighborhood: string;
  borough: string;
  lat: number;
  lng: number;
  activePlayers: number;
  status: "live" | "idle";
  conquered?: boolean;
}

export interface Highlight {
  id: string;
  player: string;
  court: string;
  caption: string;
  hype: number;
  cold: number;
  fire: number;
  timestamp: string;
}

export interface LeaderboardRow {
  rank: number;
  nickname: string;
  court: string;
  record: string;
  streak: number;
  highlight?: boolean;
}

export interface Drop {
  id: string;
  name: string;
  status: "unlocked" | "locked";
  earnedFor?: string;
  requirement?: string;
  colorway?: string;
}
