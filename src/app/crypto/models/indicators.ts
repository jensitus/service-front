export interface Indicators {
  coinId: string;
  coinName: string;
  currentPrice: number;
  currentPriceEur: number | null;
  rsi14: number | null;
  ma7: number | null;
  ma14: number | null;
  ma30: number | null;
  ma7Eur: number | null;
  ma14Eur: number | null;
  ma30Eur: number | null;
  rsiSignal: 'OVERSOLD' | 'OVERBOUGHT' | 'NEUTRAL' | null;
  maSignal: 'BULLISH' | 'BEARISH' | 'NEUTRAL' | null;
  dataPoints: number;
}

export interface PricePoint {
  recordedAt: string;
  priceUsd: number;
  priceEur: number | null;
}
