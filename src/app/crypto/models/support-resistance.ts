export interface SupportResistance {
  coinId: string;
  coinName: string;
  currentPrice: number;
  resistanceLevels: number[];
  supportLevels: number[];
  nearestResistance: number | null;
  nearestSupport: number | null;
  dataPoints: number;
}
