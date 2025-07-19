import { Chart } from "chart.js";

export type setNewVarsType = (id: string, value: any) => void;

export interface HomeVarsType {
  myChart: Chart | null; // můžeš nahradit konkrétním typem, např. Chart | null, pokud používáš Chart.js
  chartColor: string[];
  chartData: number[][]; // pole číselných polí
  labels: (string | number)[][]; // podle typu labelů, uprav pokud víš, že to jsou jen stringy

  platformNames: string[];
  currentChart: number;
  chartsNum: number;

  graphGameId: number;
  graphPlatformId1: number;
  graphPlatformId2: number;
  graphPlatformId3: number;

  currentNewIndex: number;
  news: any | null; // můžeš nahradit konkrétním typem, např. NewsItem[] | null
  gameReviews: any | null; // opět můžeš konkretizovat
  newsPageSize: number;
  gameReviewsPageSize: number;
}

export interface SearchVarsType {
  games: Game[] | null;
  page: number;
  maxPage: number;
  pageSize: number;
}

export interface GameVarsType {
  game: Game | null;
  gameReviews: GameReview[];
  platforms: Platform[];
  subGenres: SubGenre[];
  page: number;
  maxPage: number;
  pageSize: number;
  makingRev: boolean;
}

// ---------------------------------------------------------------
export type Developer = {
  id: number;
  name: string;
  owner_company: string;
  headquartes: string;
  founded: string; // ISO datum jako string (např. "1970-01-01")
};

export type Game = {
  id: number;
  name: string;
  release_date: string; // ISO datum jako string
  description: string;
  series: string;
  publisher: string;
  developer: Developer;
  img_path: string;
};

export type Platform = {
  id: number;
  name: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type SubGenre = {
  id: number;
  name: string;
  genre: Genre;
};

export type GamePlatform = {
  id: number;
  release_date: string;
  game: Game;
  platform: Platform;
};

export type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;
  last_update: string; // ISO date string
};

export type GameReview = {
  id: number;
  numerical_rev: number;
  written_rev: string;
  recommendation: boolean | null;
  time: string; // ISO date string
  game_platform: GamePlatform;
  user: User;
};

export type SearchResponse = {
  game: Game;
  platforms: Platform[];
  subGenres: SubGenre[];
  gameReviews: GameReview[];
  totalPages: number;
};
