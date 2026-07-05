export interface PriceAlert {
  id?: number;
  coinId: string;
  targetPrice: number;
  condition: 'ABOVE' | 'BELOW';
  active?: boolean;
  triggered?: boolean;
  createdAt?: string;
}
