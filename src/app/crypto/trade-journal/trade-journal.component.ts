import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CryptoService } from '../services/crypto.service';
import { CurrencyPreferenceService, Currency } from '../services/currency-preference.service';
import { Trade } from '../models/trade';
import { PortfolioSummary } from '../models/portfolio';

@Component({
  selector: 'app-trade-journal',
  templateUrl: './trade-journal.component.html',
  styleUrls: ['./trade-journal.component.css'],
  standalone: false
})
export class TradeJournalComponent implements OnInit, OnDestroy {

  trades: Trade[] = [];
  portfolio: PortfolioSummary = null;
  loading = false;
  showForm = false;
  currency: Currency = 'EUR';
  private currencySub: Subscription;

  COINS = ['bitcoin', 'litecoin', 'ethereum', 'ripple'];

  form: Partial<Trade> = {
    coinId: 'bitcoin',
    side: 'BUY',
    quantity: null,
    pricePerUnit: null,
    fee: 0,
    currency: 'EUR',
    tradedAt: new Date().toISOString().slice(0, 16),
    note: ''
  };

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
    this.loadTrades();
  }

  ngOnDestroy() {
    this.currencySub?.unsubscribe();
  }

  loadTrades() {
    this.loading = true;
    this.cryptoService.getTrades().subscribe({
      next: trades => { this.trades = trades; this.loading = false; this.cdr.detectChanges(); },
      error: () => { this.loading = false; this.cdr.detectChanges(); }
    });
    this.cryptoService.getPortfolio().subscribe({
      next: p => { this.portfolio = p; this.cdr.detectChanges(); }
    });
  }

  pnlClass(pnl: number): string {
    if (pnl == null) return 'text-muted';
    return pnl >= 0 ? 'text-success' : 'text-danger';
  }

  submitTrade() {
    const payload = { ...this.form };
    this.cryptoService.createTrade(payload).subscribe({
      next: trade => {
        this.trades.unshift(trade);
        this.resetForm();
        this.showForm = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteTrade(id: number) {
    if (!confirm('Delete this trade?')) return;
    this.cryptoService.deleteTrade(id).subscribe({
      next: () => { this.trades = this.trades.filter(t => t.id !== id); this.cdr.detectChanges(); }
    });
  }

  currentPrice(t: Trade): number | null {
    if (t.currency === 'EUR' || (!t.currency && this.currency === 'EUR')) return t.currentPriceEur ?? null;
    return t.currentPriceUsd ?? null;
  }

  sym(t?: Trade): string {
    const c = t?.currency ?? this.currency;
    return c === 'EUR' ? '€' : '$';
  }

  portfolioSym(): string { return this.currency === 'EUR' ? '€' : '$'; }

  portfolioPnl(pos: any): number {
    return this.currency === 'EUR' ? pos.unrealizedPnlEur : pos.unrealizedPnl;
  }

  portfolioPnlPct(pos: any): number {
    return this.currency === 'EUR' ? pos.unrealizedPnlPctEur : pos.unrealizedPnlPct;
  }

  portfolioValue(pos: any): number {
    return this.currency === 'EUR' ? pos.currentValueEur : pos.currentValue;
  }

  totalPnl(): number {
    if (!this.portfolio) return 0;
    return this.currency === 'EUR' ? this.portfolio.totalUnrealizedPnlEur : this.portfolio.totalUnrealizedPnl;
  }

  totalPnlPct(): number {
    if (!this.portfolio) return 0;
    return this.currency === 'EUR' ? this.portfolio.totalUnrealizedPnlPctEur : this.portfolio.totalUnrealizedPnlPct;
  }

  totalValue(): number {
    if (!this.portfolio) return 0;
    return this.currency === 'EUR' ? this.portfolio.totalCurrentValueEur : this.portfolio.totalCurrentValue;
  }

  resetForm() {
    this.form = {
      coinId: 'bitcoin',
      side: 'BUY',
      quantity: null,
      pricePerUnit: null,
      fee: 0,
      currency: 'EUR',
      tradedAt: new Date().toISOString().slice(0, 16),
      note: ''
    };
  }

  totalCost(trade: Trade): number {
    return trade.totalValue + (trade.fee || 0);
  }
}
