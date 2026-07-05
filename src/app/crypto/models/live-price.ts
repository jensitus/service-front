export interface LivePrice {
  coinId: string;
  coinName: string;
  priceUsd: number;
  priceChange24h: number;
  marketCapUsd: number;
  priceEur: number;
  priceChange24hEur: number;
  marketCapEur: number;
  fetchedAt: string;
}
