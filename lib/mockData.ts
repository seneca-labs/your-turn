import type {
  User,
  Opponent,
  Court,
  Highlight,
  LeaderboardRow,
  Drop,
} from "./types";

export const user: User = {
  nickname: "SWEET SHADOW",
  realName: null,
  record: { wins: 12, losses: 3, currentStreak: 4 },
  homeCourt: "West 4th",
  neighborhood: "Greenwich Village",
  city: "New York",
  team: { name: "THE LANDLORDS", roster: 6 },
  signatureStats: {
    fadeaway: "78%",
    crossover: "12 ankles",
    closeOut: "+8.3",
  },
  rank: { court: 1, neighborhood: 3, city: 47, global: 1247 },
  earnedDrops: 2,
  totalGames: 15,
  joined: "October 2025",
};

export const opponents: Opponent[] = [
  {
    id: "two-step",
    nickname: "TWO-STEP",
    record: { wins: 8, losses: 5, currentStreak: 1 },
    homeCourt: "West 4th",
    rank: { neighborhood: 12 },
    intimidation: "low",
    signatureStats: {
      fadeaway: "61%",
      crossover: "4 ankles",
      closeOut: "+1.2",
    },
  },
  {
    id: "the-landlord",
    nickname: "THE LANDLORD",
    record: { wins: 22, losses: 4, currentStreak: 7 },
    homeCourt: "Marcus Garvey",
    rank: { neighborhood: 2 },
    intimidation: "medium",
    signatureStats: {
      fadeaway: "82%",
      crossover: "19 ankles",
      closeOut: "+12.4",
    },
  },
  {
    id: "black-jesus",
    nickname: "BLACK JESUS",
    record: { wins: 41, losses: 6, currentStreak: 12 },
    homeCourt: "Rucker",
    rank: { neighborhood: 1, borough: 1 },
    intimidation: "high",
    signatureStats: {
      fadeaway: "91%",
      crossover: "47 ankles",
      closeOut: "+21.0",
    },
  },
];

export const courts: Court[] = [
  {
    id: "west-4th",
    name: "West 4th Street Courts",
    neighborhood: "Greenwich Village",
    borough: "Manhattan",
    lat: 40.7311,
    lng: -74.0019,
    activePlayers: 8,
    status: "live",
    conquered: true,
  },
  {
    id: "rucker",
    name: "Rucker Park",
    neighborhood: "Harlem",
    borough: "Manhattan",
    lat: 40.8298,
    lng: -73.9365,
    activePlayers: 14,
    status: "live",
  },
  {
    id: "dyckman",
    name: "Dyckman Courts",
    neighborhood: "Inwood",
    borough: "Manhattan",
    lat: 40.8677,
    lng: -73.927,
    activePlayers: 6,
    status: "live",
  },
  {
    id: "tompkins",
    name: "Tompkins Square",
    neighborhood: "East Village",
    borough: "Manhattan",
    lat: 40.7264,
    lng: -73.9818,
    activePlayers: 4,
    status: "idle",
    conquered: true,
  },
  {
    id: "marcus-garvey",
    name: "Marcus Garvey Park",
    neighborhood: "Harlem",
    borough: "Manhattan",
    lat: 40.8042,
    lng: -73.9446,
    activePlayers: 11,
    status: "live",
  },
  {
    id: "gersh",
    name: "Gersh Park",
    neighborhood: "East New York",
    borough: "Brooklyn",
    lat: 40.6711,
    lng: -73.8838,
    activePlayers: 9,
    status: "live",
  },
];

export const courtActiveNicknames: Record<string, string[]> = {
  "west-4th": [
    "TWO-STEP",
    "CROSSCITY",
    "SHAKE",
    "TALL MIKE",
    "JET",
    "WORKBOOT",
    "QUICK",
    "ICE",
  ],
};

export const highlights: Highlight[] = [
  {
    id: "h1",
    player: "SWEET SHADOW",
    court: "west-4th",
    caption: "FADEAWAY OVER TWO-STEP",
    hype: 247,
    cold: 89,
    fire: 412,
    timestamp: "2H AGO",
  },
  {
    id: "h2",
    player: "SWEET SHADOW",
    court: "west-4th",
    caption: "CROSSOVER. LEFT HIM IN THE PAINT.",
    hype: 412,
    cold: 134,
    fire: 581,
    timestamp: "5H AGO",
  },
  {
    id: "h3",
    player: "THE LANDLORD",
    court: "marcus-garvey",
    caption: "POSTER",
    hype: 891,
    cold: 410,
    fire: 1204,
    timestamp: "1D AGO",
  },
];

export const leaderboardCity: LeaderboardRow[] = [
  { rank: 1, nickname: "BLACK JESUS", court: "Rucker", record: "41-6", streak: 12 },
  { rank: 2, nickname: "THE LANDLORD", court: "Marcus Garvey", record: "22-4", streak: 7 },
  { rank: 3, nickname: "MCNASTY", court: "Brooklyn Tech", record: "18-5", streak: 3 },
  { rank: 4, nickname: "DYCKMAN DON", court: "Dyckman", record: "17-6", streak: 2 },
  { rank: 5, nickname: "BORICUA", court: "Tompkins", record: "16-7", streak: 0 },
  { rank: 6, nickname: "POSTMAN", court: "Gersh Park", record: "15-7", streak: 1 },
  { rank: 7, nickname: "BUTTERS", court: "Goat Park", record: "14-6", streak: 4 },
  { rank: 8, nickname: "CROSSCITY", court: "West 4th", record: "13-5", streak: 0 },
  { rank: 9, nickname: "SHOWTIME", court: "Lincoln", record: "13-7", streak: 2 },
  { rank: 10, nickname: "QUICK 6", court: "Hollis", record: "12-6", streak: 1 },
  { rank: 47, nickname: "SWEET SHADOW", court: "West 4th", record: "12-3", streak: 4, highlight: true },
];

export const leaderboardCourt: LeaderboardRow[] = [
  { rank: 1, nickname: "SWEET SHADOW", court: "West 4th", record: "12-3", streak: 4, highlight: true },
  { rank: 2, nickname: "TWO-STEP", court: "West 4th", record: "8-5", streak: 1 },
  { rank: 3, nickname: "CROSSCITY", court: "West 4th", record: "13-5", streak: 0 },
  { rank: 4, nickname: "SHAKE", court: "West 4th", record: "9-4", streak: 2 },
  { rank: 5, nickname: "TALL MIKE", court: "West 4th", record: "7-7", streak: 0 },
  { rank: 6, nickname: "JET", court: "West 4th", record: "6-3", streak: 3 },
  { rank: 7, nickname: "WORKBOOT", court: "West 4th", record: "6-6", streak: 0 },
  { rank: 8, nickname: "QUICK", court: "West 4th", record: "5-4", streak: 1 },
  { rank: 9, nickname: "ICE", court: "West 4th", record: "4-5", streak: 0 },
  { rank: 10, nickname: "WALL ST", court: "West 4th", record: "4-7", streak: 0 },
];

export const drops: Drop[] = [
  {
    id: "d1",
    name: "AIR JORDAN 1 / WEST 4TH",
    status: "unlocked",
    earnedFor: "HELD THE COURT 10 DAYS",
    colorway: "BLACK / VARSITY RED",
  },
  {
    id: "d2",
    name: "AIR JORDAN 3 / GREENWICH",
    status: "unlocked",
    earnedFor: "W4 STREAK",
    colorway: "BONE / CONCRETE",
  },
  {
    id: "d3",
    name: "AIR JORDAN 4 / DYCKMAN",
    status: "locked",
    requirement: "WIN DYCKMAN LADDER",
  },
  {
    id: "d4",
    name: "AIR JORDAN 6 / RUCKER",
    status: "locked",
    requirement: "TOP 25 IN CITY",
  },
  {
    id: "d5",
    name: "AIR JORDAN 11 / HARLEM",
    status: "locked",
    requirement: "BORO TOP 5",
  },
  {
    id: "d6",
    name: "AIR JORDAN 12 / BROOKLYN",
    status: "locked",
    requirement: "BEAT THE LANDLORD",
  },
  {
    id: "d7",
    name: "THE ONE / REGIONAL",
    status: "locked",
    requirement: "TOP 10 IN CITY",
  },
  {
    id: "d8",
    name: "AIR JORDAN 13 / EAST NY",
    status: "locked",
    requirement: "GERSH PARK CHAMP",
  },
  {
    id: "d9",
    name: "BLACK CAT / NATIONAL",
    status: "locked",
    requirement: "WIN THE ONE",
  },
];

export const teamRoster = [
  "SWEET SHADOW",
  "CROSSCITY",
  "JET",
  "SHAKE",
  "WORKBOOT",
  "QUICK",
];

// Demo screen route order for the auto-cycler.
export const demoOrder: string[] = [
  "/notification",
  "/court/west-4th",
  "/player/sweet-shadow",
  "/matchup/two-step",
  "/matchup/the-landlord",
  "/matchup/black-jesus",
  "/game/live",
  "/jury",
  "/capture",
  "/feed",
  "/leaderboard",
  "/drop/unlocked",
  "/notification/the-one",
  "/onboard",
  "/court-detail/west-4th",
  "/team/landlords",
  "/tournament",
  "/locker",
];

export function findCourt(id: string): Court | undefined {
  return courts.find((c) => c.id === id);
}

export function findOpponent(id: string): Opponent | undefined {
  return opponents.find((o) => o.id === id);
}
