import { Chart } from "chart.js";

export type setNewVarsType = (id: string, value: any) => void;

export interface VarsState {
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