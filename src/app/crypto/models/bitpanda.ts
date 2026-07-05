export interface BitpandaTrade {
  bitpandaId: string;
  type: string;            // buy / sell
  coinSymbol: string;      // BTC, LTC, ...
  mappedCoinId: string | null;
  cryptoAmount: number;
  fiatAmount: number;
  price: number;
  status: string;
  tradedAt: string;
  tracked: boolean;
}

export interface BitpandaTestResult {
  success: boolean;
  message: string;
  totalCount: number;
  trades: BitpandaTrade[];
}

export interface BitpandaCredentialStatus {
  hasKey: boolean;
  createdAt: string | null;
  lastSyncedAt: string | null;
}

export interface BitpandaSyncResult {
  success: boolean;
  message: string;
  totalFetched: number;
  imported: number;
  skippedDuplicates: number;
  skippedUntracked: number;
  skippedUnfinished: number;
  lastSyncedAt: string | null;
}
