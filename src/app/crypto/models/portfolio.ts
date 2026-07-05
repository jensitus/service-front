export interface PortfolioPosition {
  coinId: string;
  coinName: string;
  netQuantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  currentPriceEur: number;
  currentValue: number;
  currentValueEur: number;
  totalInvested: number;
  unrealizedPnl: number;
  unrealizedPnlPct: number;
  unrealizedPnlEur: number;
  unrealizedPnlPctEur: number;
  totalFees: number;
}

export interface PortfolioSummary {
  positions: PortfolioPosition[];
  totalInvested: number;
  totalCurrentValue: number;
  totalCurrentValueEur: number;
  totalUnrealizedPnl: number;
  totalUnrealizedPnlPct: number;
  totalUnrealizedPnlEur: number;
  totalUnrealizedPnlPctEur: number;
}
