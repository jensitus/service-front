import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChartConfiguration } from 'chart.js';
import { CryptoService } from '../services/crypto.service';
import { CurrencyPreferenceService, Currency } from '../services/currency-preference.service';
import { Indicators, PricePoint } from '../models/indicators';
import { SupportResistance } from '../models/support-resistance';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css'],
  standalone: false
})
export class CoinDetailComponent implements OnInit, OnDestroy {

  coinId: string;
  indicators: Indicators = null;
  sr: SupportResistance = null;
  history: PricePoint[] = [];
  loading = true;
  selectedHours = 24;
  currency: Currency = 'EUR';
  private currencySub: Subscription;

  chartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: true },
      tooltip: { callbacks: {
        label: ctx => `$${ctx.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      }}
    },
    scales: {
      x: { ticks: { maxTicksLimit: 12, maxRotation: 0 } },
      y: {
        ticks: {
          callback: v => `$${Number(v).toLocaleString()}`
        }
      }
    }
  };

  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoService,
    private cdr: ChangeDetectorRef,
    public currencyPref: CurrencyPreferenceService
  ) {}

  ngOnInit() {
    this.coinId = this.route.snapshot.paramMap.get('coinId');
    this.currency = this.currencyPref.current;
    this.currencySub = this.currencyPref.currency$.subscribe(c => {
      this.currency = c;
      if (this.history.length) this.buildChart(this.history);
      this.cdr.detectChanges();
    });
    this.load();
  }

  ngOnDestroy() {
    this.currencySub?.unsubscribe();
  }

  load() {
    this.loading = true;
    this.cryptoService.getIndicators(this.coinId).subscribe({
      next: ind => { this.indicators = ind; this.cdr.detectChanges(); },
      error: () => this.cdr.detectChanges()
    });
    this.cryptoService.getSupportResistance(this.coinId).subscribe({
      next: sr => { this.sr = sr; this.cdr.detectChanges(); }
    });
    this.cryptoService.getPriceHistory(this.coinId, this.selectedHours).subscribe({
      next: points => {
        this.history = points;
        this.buildChart(points);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  buildChart(points: PricePoint[]) {
    const isEur = this.currency === 'EUR';
    const sym = isEur ? '€' : '$';
    const labels = points.map(p => {
      const d = new Date(p.recordedAt);
      return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
    });
    const prices = points.map(p => Number(isEur && p.priceEur != null ? p.priceEur : p.priceUsd));

    const datasets: ChartConfiguration<'line'>['data']['datasets'] = [
      {
        label: `${this.coinId.toUpperCase()} Price (${this.currency})`,
        data: prices,
        borderColor: '#0d6efd',
        backgroundColor: 'rgba(13,110,253,0.08)',
        borderWidth: 2,
        pointRadius: prices.length > 50 ? 0 : 3,
        tension: 0.3,
        fill: true
      }
    ];

    const ma7 = this.movingAverage(prices, 7);
    const ma14 = this.movingAverage(prices, 14);
    const maLabel7  = isEur && this.indicators?.ma7Eur  != null ? `MA7 (${sym}${Number(this.indicators.ma7Eur).toFixed(2)})`  : `MA7 (${sym}${Number(this.indicators?.ma7).toFixed(2)})`;
    const maLabel14 = isEur && this.indicators?.ma14Eur != null ? `MA14 (${sym}${Number(this.indicators.ma14Eur).toFixed(2)})` : `MA14 (${sym}${Number(this.indicators?.ma14).toFixed(2)})`;

    if (ma7.some(v => v !== null)) {
      datasets.push({
        label: maLabel7,
        data: ma7,
        borderColor: '#fd7e14',
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
        spanGaps: false
      } as any);
    }

    if (ma14.some(v => v !== null)) {
      datasets.push({
        label: maLabel14,
        data: ma14,
        borderColor: '#dc3545',
        borderWidth: 1.5,
        borderDash: [6, 3],
        pointRadius: 0,
        fill: false,
        spanGaps: false
      } as any);
    }

    // Support/resistance — flat horizontal lines across the full chart width
    if (this.sr) {
      this.sr.resistanceLevels.forEach((level, i) => {
        datasets.push({
          label: i === 0 ? `R1 $${Number(level).toFixed(2)}` : `R${i + 1} $${Number(level).toFixed(2)}`,
          data: new Array(prices.length).fill(Number(level)),
          borderColor: i === 0 ? '#dc3545' : 'rgba(220,53,69,0.45)',
          borderWidth: i === 0 ? 1.5 : 1,
          borderDash: [8, 4],
          pointRadius: 0,
          fill: false
        } as any);
      });

      this.sr.supportLevels.forEach((level, i) => {
        datasets.push({
          label: i === 0 ? `S1 $${Number(level).toFixed(2)}` : `S${i + 1} $${Number(level).toFixed(2)}`,
          data: new Array(prices.length).fill(Number(level)),
          borderColor: i === 0 ? '#198754' : 'rgba(25,135,84,0.45)',
          borderWidth: i === 0 ? 1.5 : 1,
          borderDash: [8, 4],
          pointRadius: 0,
          fill: false
        } as any);
      });
    }

    this.chartData = { labels, datasets };
  }

  private movingAverage(data: number[], period: number): (number | null)[] {
    return data.map((_, i) => {
      if (i < period - 1) return null;
      const window = data.slice(i - period + 1, i + 1);
      return window.reduce((a, b) => a + b, 0) / period;
    });
  }

  rsiClass(): string {
    if (!this.indicators?.rsiSignal) return 'text-muted';
    if (this.indicators.rsiSignal === 'OVERSOLD') return 'text-success fw-bold';
    if (this.indicators.rsiSignal === 'OVERBOUGHT') return 'text-danger fw-bold';
    return 'text-warning';
  }

  maClass(): string {
    if (!this.indicators?.maSignal) return 'text-muted';
    return this.indicators.maSignal === 'BULLISH' ? 'text-success fw-bold' : 'text-danger fw-bold';
  }

  srPosition(): number {
    if (!this.sr?.nearestSupport || !this.sr?.nearestResistance) return 50;
    const range = Number(this.sr.nearestResistance) - Number(this.sr.nearestSupport);
    if (range === 0) return 50;
    const pos = (Number(this.sr.currentPrice) - Number(this.sr.nearestSupport)) / range * 100;
    return Math.min(100, Math.max(0, pos));
  }

  srPositionLabel(): string {
    const pct = this.srPosition();
    if (pct < 25) return 'Close to support — price near a floor';
    if (pct > 75) return 'Close to resistance — price near a ceiling';
    return 'Mid-range between support and resistance';
  }

  coinNames: Record<string,string> = {
    bitcoin: 'Bitcoin', litecoin: 'Litecoin', ethereum: 'Ethereum', ripple: 'XRP'
  };
}
