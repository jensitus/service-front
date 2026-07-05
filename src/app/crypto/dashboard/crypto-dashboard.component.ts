import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CryptoService } from '../services/crypto.service';
import { CurrencyPreferenceService, Currency } from '../services/currency-preference.service';
import { LivePrice } from '../models/live-price';
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-crypto-dashboard',
  templateUrl: './crypto-dashboard.component.html',
  styleUrls: ['./crypto-dashboard.component.css'],
  standalone: false
})
export class CryptoDashboardComponent implements OnInit, OnDestroy {

  prices: LivePrice[] = [];
  loading = true;
  error: string = null;
  lastUpdated: Date = null;
  currency: Currency = 'EUR';
  private refreshSub: Subscription;
  private currencySub: Subscription;

  constructor(
    private cryptoService: CryptoService,
    private cdr: ChangeDetectorRef,
    public currencyPref: CurrencyPreferenceService
  ) {}

  ngOnInit() {
    this.currency = this.currencyPref.current;
    this.currencySub = this.currencyPref.currency$.subscribe(c => {
      this.currency = c;
      this.cdr.detectChanges();
    });
    this.loadPrices();
    this.refreshSub = interval(120_000).pipe(
      switchMap(() => this.cryptoService.getPrices())
    ).subscribe({
      next: prices => {
        this.prices = prices;
        this.lastUpdated = new Date();
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    this.refreshSub?.unsubscribe();
    this.currencySub?.unsubscribe();
  }

  loadPrices() {
    this.loading = true;
    this.error = null;
    this.cryptoService.getPrices().subscribe({
      next: prices => {
        this.prices = prices;
        this.lastUpdated = new Date();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('[CryptoDashboard] error:', err);
        this.error = 'Could not load prices. Check the browser console.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  forceRefresh() {
    this.loading = true;
    this.error = null;
    this.cryptoService.refreshPrices().subscribe({
      next: () => this.loadPrices(),
      error: err => {
        console.error('[CryptoDashboard] refresh error:', err);
        this.error = 'Refresh failed.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  priceChangeClass(change: number): string {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-danger';
    return 'text-muted';
  }

  price(p: LivePrice): number {
    return this.currency === 'EUR' ? p.priceEur : p.priceUsd;
  }

  change24h(p: LivePrice): number {
    return this.currency === 'EUR' ? p.priceChange24hEur : p.priceChange24h;
  }

  marketCap(p: LivePrice): number {
    return this.currency === 'EUR' ? p.marketCapEur : p.marketCapUsd;
  }

  formatMarketCap(value: number): string {
    if (!value) return '—';
    const sym = this.currency === 'EUR' ? '€' : '$';
    if (value >= 1_000_000_000_000) return `${sym}${(value / 1_000_000_000_000).toFixed(2)}T`;
    if (value >= 1_000_000_000)     return `${sym}${(value / 1_000_000_000).toFixed(2)}B`;
    return `${sym}${value.toLocaleString()}`;
  }

  protected readonly faSyncAlt = faSyncAlt;
}
