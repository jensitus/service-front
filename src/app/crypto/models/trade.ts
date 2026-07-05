export interface Trade {
  id?: number;
  coinId: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  pricePerUnit: number;
  fee?: number;
  totalValue?: number;
  tradedAt: string;
  note?: string;
  currency?: string;
  source?: string;
  currentPriceUsd?: number;
  currentPriceEur?: number;
  unrealizedPnl?: number;
}
