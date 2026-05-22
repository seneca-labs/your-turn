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

export interface GameStats {
  pts: number;
  fg: string; // "5/9"
  twoPt: number; // deep makes (behind arc, worth 2 in 1v1 pickup scoring)
  ankles: number; // crossover breaks
}

export interface MatchGame {
  finalScoreSelf: number;
  finalScoreOpp: number;
  selfStats: GameStats;
  oppStats: GameStats;
  shotChartSelf: ShotMark[];
  shotChartOpp: ShotMark[];
}

export interface ShotMark {
  x: number; // 0..1 across the half court width
  y: number; // 0..1 down the half court length
  made: boolean;
}

export interface User {
  id: string;
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
  photo: string;
  halfFace: string;
}

export interface Opponent {
  id: string;
  nickname: string;
  record: WinLoss;
  homeCourt: string;
  neighborhood: string;
  rank: Rank;
  intimidation: Intimidation;
  signatureStats?: {
    fadeaway: string;
    crossover: string;
    closeOut: string;
  };
  team: Team;
  joined: string;
  photo: string;
  halfFace: string;
  matchVsSelf: MatchGame;
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
