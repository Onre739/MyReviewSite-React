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

export type gameReviewType = {
  id: number;
  numerical_rev: number;
  written_rev: string;
  recommendation: boolean | null;
  time: string; // ISO datetime string

  game_platform: {
    id: number;
    release_date: string; // ISO date string

    game: {
      id: number;
      name: string;
      release_date: string;
      description: string;
      series: string;
      publisher: string;

      developer: {
        id: number;
        name: string;
        owner_company: string;
        headquartes: string;
        founded: string; // ISO date string
      };

      img_path: string;
    };

    platform: {
      id: number;
      name: string;
    };
  };

  user: {
    id: number;
    email: string;
    name: string;
    password: string;
    role: string;
    last_update: string; // ISO datetime string
  };
};

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
