import type {
  User,
  Opponent,
  Court,
  Highlight,
  LeaderboardRow,
  Drop,
  ShotMark,
} from "./types";

export const user: User = {
  id: "sweet-shadow",
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
  photo: "/players/sweet-shadow.png",
  halfFace: "/half-faces/sweet-shadow.png",
};

// Shot-chart helpers. Coordinates are 0..1 across a half-court rectangle.
// x = horizontal, y = vertical (0 at top/rim end, 1 at half-court line).
const shotsTwoStepSelf: ShotMark[] = [
  { x: 0.5, y: 0.18, made: true },  // close
  { x: 0.32, y: 0.28, made: true }, // mid left
  { x: 0.68, y: 0.34, made: false },
  { x: 0.5, y: 0.42, made: true },  // free throw line
  { x: 0.22, y: 0.55, made: true }, // wing 3
  { x: 0.78, y: 0.58, made: false },
  { x: 0.5, y: 0.66, made: true },  // top 3
  { x: 0.36, y: 0.5, made: false },
];
const shotsTwoStepOpp: ShotMark[] = [
  { x: 0.5, y: 0.2, made: false },
  { x: 0.4, y: 0.3, made: true },
  { x: 0.6, y: 0.4, made: false },
  { x: 0.3, y: 0.5, made: true },
  { x: 0.7, y: 0.55, made: false },
  { x: 0.5, y: 0.6, made: true },
  { x: 0.45, y: 0.45, made: false },
];

const shotsTheJetSelf: ShotMark[] = [
  { x: 0.5, y: 0.16, made: true },
  { x: 0.36, y: 0.3, made: true },
  { x: 0.64, y: 0.3, made: false },
  { x: 0.5, y: 0.4, made: true },
  { x: 0.24, y: 0.55, made: true },
  { x: 0.76, y: 0.58, made: true },
  { x: 0.5, y: 0.7, made: false },
  { x: 0.4, y: 0.45, made: true },
  { x: 0.6, y: 0.5, made: false },
];
const shotsTheJetOpp: ShotMark[] = [
  { x: 0.5, y: 0.22, made: true },
  { x: 0.4, y: 0.32, made: true },
  { x: 0.6, y: 0.4, made: true },
  { x: 0.3, y: 0.55, made: false },
  { x: 0.7, y: 0.6, made: true },
  { x: 0.5, y: 0.68, made: false },
  { x: 0.55, y: 0.45, made: true },
];

const shotsIcemanSelf: ShotMark[] = [
  { x: 0.5, y: 0.18, made: true },
  { x: 0.34, y: 0.28, made: false },
  { x: 0.66, y: 0.32, made: true },
  { x: 0.5, y: 0.42, made: true },
  { x: 0.22, y: 0.55, made: false },
  { x: 0.78, y: 0.58, made: true },
  { x: 0.5, y: 0.68, made: true },
  { x: 0.4, y: 0.46, made: true },
  { x: 0.6, y: 0.5, made: false },
  { x: 0.5, y: 0.78, made: true }, // deep
];
const shotsIcemanOpp: ShotMark[] = [
  { x: 0.5, y: 0.18, made: true },
  { x: 0.38, y: 0.28, made: true },
  { x: 0.62, y: 0.32, made: false },
  { x: 0.5, y: 0.4, made: true },
  { x: 0.26, y: 0.52, made: true },
  { x: 0.74, y: 0.56, made: true },
  { x: 0.5, y: 0.66, made: true },
  { x: 0.45, y: 0.45, made: false },
  { x: 0.55, y: 0.5, made: true },
];

export const opponents: Opponent[] = [
  {
    id: "two-step",
    nickname: "TWO-STEP",
    record: { wins: 8, losses: 5, currentStreak: 1 },
    homeCourt: "West 4th",
    neighborhood: "Greenwich Village",
    rank: { court: 2, neighborhood: 12, city: 234, global: 4521 },
    intimidation: "low",
    signatureStats: {
      fadeaway: "61%",
      crossover: "4 ankles",
      closeOut: "+1.2",
    },
    team: { name: "SOHO SQUAD", roster: 5 },
    joined: "January 2026",
    photo: "/players/two-step.png",
    halfFace: "/half-faces/two-step.png",
    matchVsSelf: {
      finalScoreSelf: 9,
      finalScoreOpp: 6,
      // 9 pts from 5 FG = 1 one-pointer + 4 two-pointers, OR 3 ones + 3 twos. Using 4 ones + 2 twos = 8; 3 ones + 3 twos = 9 ✓
      selfStats: { pts: 9, fg: "5/8", twoPt: 2, ankles: 1 },
      // 6 pts from 3 FG = 0 ones + 3 twos = 6 ✓
      oppStats: { pts: 6, fg: "3/7", twoPt: 3, ankles: 0 },
      shotChartSelf: shotsTwoStepSelf,
      shotChartOpp: shotsTwoStepOpp,
    },
  },
  {
    id: "the-jet",
    nickname: "THE JET",
    record: { wins: 22, losses: 4, currentStreak: 7 },
    homeCourt: "Marcus Garvey",
    neighborhood: "Harlem",
    rank: { court: 1, neighborhood: 2, city: 18, global: 847 },
    intimidation: "medium",
    signatureStats: {
      fadeaway: "82%",
      crossover: "19 ankles",
      closeOut: "+12.4",
    },
    team: { name: "UPTOWN KINGS", roster: 6 },
    joined: "March 2025",
    photo: "/players/the-jet.png",
    halfFace: "/half-faces/the-jet.png",
    matchVsSelf: {
      finalScoreSelf: 10,
      finalScoreOpp: 8,
      // 10 pts from 7 FG: 4 ones + 3 twos = 10 ✓ (capped <11 since first-to-11)
      selfStats: { pts: 10, fg: "7/12", twoPt: 3, ankles: 3 },
      // 8 pts from 5 FG: 2 ones + 3 twos = 8 ✓
      oppStats: { pts: 8, fg: "5/10", twoPt: 3, ankles: 2 },
      shotChartSelf: shotsTheJetSelf,
      shotChartOpp: shotsTheJetOpp,
    },
  },
  {
    id: "iceman",
    nickname: "ICEMAN",
    record: { wins: 41, losses: 6, currentStreak: 12 },
    homeCourt: "Rucker",
    neighborhood: "Harlem",
    rank: { court: 1, neighborhood: 1, borough: 1, city: 3, global: 142 },
    intimidation: "high",
    signatureStats: {
      fadeaway: "91%",
      crossover: "47 ankles",
      closeOut: "+21.0",
    },
    team: { name: "RUCKER ALL-CITY", roster: 8 },
    joined: "August 2024",
    photo: "/players/iceman.png",
    halfFace: "/half-faces/iceman.png",
    matchVsSelf: {
      finalScoreSelf: 10,
      finalScoreOpp: 9,
      // 10 pts from 7 FG: 4 ones + 3 twos = 10 ✓ (capped <11 since first-to-11)
      selfStats: { pts: 10, fg: "7/13", twoPt: 3, ankles: 4 },
      // 9 pts from 5 FG: 1 one + 4 twos = 9 ✓
      oppStats: { pts: 9, fg: "5/11", twoPt: 4, ankles: 3 },
      shotChartSelf: shotsIcemanSelf,
      shotChartOpp: shotsIcemanOpp,
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
    "WORKBOOT",
    "QUICK",
    "ICE",
    "BOOTLEG",
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
    player: "THE JET",
    court: "marcus-garvey",
    caption: "POSTER",
    hype: 891,
    cold: 410,
    fire: 1204,
    timestamp: "1D AGO",
  },
];

export const leaderboardCity: LeaderboardRow[] = [
  { rank: 1, nickname: "ICEMAN", court: "Rucker", record: "41-6", streak: 12 },
  { rank: 2, nickname: "THE JET", court: "Marcus Garvey", record: "22-4", streak: 7 },
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
  { rank: 6, nickname: "BOOTLEG", court: "West 4th", record: "6-3", streak: 3 },
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
    requirement: "BEAT THE JET",
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
  "BOOTLEG",
  "SHAKE",
  "WORKBOOT",
  "QUICK",
];

// Demo screen route order for the auto-cycler.
export const demoOrder: string[] = [
  "/notification",
  "/court/west-4th",
  "/player/sweet-shadow",
  "/player/two-step",
  "/matchup/two-step",
  "/matchup/the-jet",
  "/matchup/iceman",
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

// Lookup by nickname or id — used by /player/[nickname] which works for both
// the main user (sweet-shadow) and opponents.
export function findPerson(idOrNickname: string): User | Opponent | undefined {
  const slug = idOrNickname.toLowerCase().replace(/[\s_]/g, "-");
  if (slug === user.id) return user;
  return opponents.find(
    (o) => o.id === slug || o.nickname.toLowerCase().replace(/\s+/g, "-") === slug,
  );
}
