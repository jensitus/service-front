import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { PriceAlert } from '../models/price-alert';

@Component({
  selector: 'app-crypto-alerts',
  templateUrl: './crypto-alerts.component.html',
  styleUrls: ['./crypto-alerts.component.css'],
  standalone: false
})
export class CryptoAlertsComponent implements OnInit {

  alerts: PriceAlert[] = [];
  loading = false;
  showForm = false;

  COINS = ['bitcoin', 'litecoin', 'ethereum', 'ripple'];

  form: Partial<PriceAlert> = {
    coinId: 'bitcoin',
    condition: 'ABOVE',
    targetPrice: null
  };

  constructor(private cryptoService: CryptoService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadAlerts();
  }

  loadAlerts() {
    this.loading = true;
    this.cryptoService.getAlerts().subscribe({
      next: alerts => { this.alerts = alerts; this.loading = false; this.cdr.detectChanges(); },
      error: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  submitAlert() {
    this.cryptoService.createAlert(this.form).subscribe({
      next: alert => {
        this.alerts.unshift(alert);
        this.resetForm();
        this.showForm = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggle(id: number) {
    this.cryptoService.toggleAlert(id).subscribe({
      next: updated => {
        const idx = this.alerts.findIndex(a => a.id === id);
        if (idx >= 0) this.alerts[idx] = updated;
        this.cdr.detectChanges();
      }
    });
  }

  deleteAlert(id: number) {
    if (!confirm('Delete this alert?')) return;
    this.cryptoService.deleteAlert(id).subscribe({
      next: () => { this.alerts = this.alerts.filter(a => a.id !== id); this.cdr.detectChanges(); }
    });
  }

  resetForm() {
    this.form = { coinId: 'bitcoin', condition: 'ABOVE', targetPrice: null };
  }

  statusLabel(alert: PriceAlert): string {
    if (alert.triggered) return 'Triggered';
    if (alert.active) return 'Active';
    return 'Paused';
  }

  statusClass(alert: PriceAlert): string {
    if (alert.triggered) return 'bg-warning text-dark';
    if (alert.active) return 'bg-success';
    return 'bg-secondary';
  }
}
