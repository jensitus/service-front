import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LivePrice } from '../models/live-price';
import { Trade } from '../models/trade';
import { PriceAlert } from '../models/price-alert';
import { Indicators, PricePoint } from '../models/indicators';
import { PortfolioSummary } from '../models/portfolio';
import { SupportResistance } from '../models/support-resistance';
import { BitpandaTestResult, BitpandaCredentialStatus, BitpandaSyncResult } from '../models/bitpanda';

@Injectable({ providedIn: 'root' })
export class CryptoService {

  private base = `${environment.api_url}/service/crypto`;

  constructor(private http: HttpClient) {}

  getPrices(): Observable<LivePrice[]> {
    return this.http.get<LivePrice[]>(`${this.base}/prices`);
  }

  refreshPrices(): Observable<void> {
    return this.http.post<void>(`${this.base}/prices/refresh`, null);
  }

  getPriceHistory(coinId: string, hours = 24): Observable<PricePoint[]> {
    return this.http.get<PricePoint[]>(`${this.base}/history/${coinId}?hours=${hours}`);
  }

  getIndicators(coinId: string): Observable<Indicators> {
    return this.http.get<Indicators>(`${this.base}/indicators/${coinId}`);
  }

  getSupportResistance(coinId: string): Observable<SupportResistance> {
    return this.http.get<SupportResistance>(`${this.base}/sr/${coinId}`);
  }

  getPortfolio(): Observable<PortfolioSummary> {
    return this.http.get<PortfolioSummary>(`${this.base}/portfolio`);
  }

  testBitpanda(apiKey: string): Observable<BitpandaTestResult> {
    return this.http.post<BitpandaTestResult>(`${this.base}/bitpanda/test`, { apiKey });
  }

  getBitpandaStatus(): Observable<BitpandaCredentialStatus> {
    return this.http.get<BitpandaCredentialStatus>(`${this.base}/bitpanda/credential`);
  }

  saveBitpandaKey(apiKey: string): Observable<BitpandaCredentialStatus> {
    return this.http.post<BitpandaCredentialStatus>(`${this.base}/bitpanda/credential`, { apiKey });
  }

  deleteBitpandaKey(): Observable<void> {
    return this.http.delete<void>(`${this.base}/bitpanda/credential`);
  }

  syncBitpanda(): Observable<BitpandaSyncResult> {
    return this.http.post<BitpandaSyncResult>(`${this.base}/bitpanda/sync`, null);
  }

  getTrades(): Observable<Trade[]> {
    return this.http.get<Trade[]>(`${this.base}/trades`);
  }

  createTrade(form: Partial<Trade>): Observable<Trade> {
    return this.http.post<Trade>(`${this.base}/trades`, form);
  }

  deleteTrade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/trades/${id}`);
  }

  getAlerts(): Observable<PriceAlert[]> {
    return this.http.get<PriceAlert[]>(`${this.base}/alerts`);
  }

  createAlert(form: Partial<PriceAlert>): Observable<PriceAlert> {
    return this.http.post<PriceAlert>(`${this.base}/alerts`, form);
  }

  toggleAlert(id: number): Observable<PriceAlert> {
    return this.http.put<PriceAlert>(`${this.base}/alerts/${id}/toggle`, null);
  }

  deleteAlert(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/alerts/${id}`);
  }
}
