import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { BitpandaCredentialStatus, BitpandaSyncResult } from '../models/bitpanda';

@Component({
  selector: 'app-bitpanda-import',
  templateUrl: './bitpanda-import.component.html',
  styleUrls: ['./bitpanda-import.component.css'],
  standalone: false
})
export class BitpandaImportComponent implements OnInit, OnDestroy {

  // Keep in sync with SYNC_COOLDOWN_SECONDS on the backend.
  private readonly cooldownSeconds = 60;

  status: BitpandaCredentialStatus = null;
  apiKey = '';
  loadingStatus = true;
  connecting = false;
  syncing = false;
  syncResult: BitpandaSyncResult = null;
  error: string = null;
  cooldownRemaining = 0;
  private cooldownTimer: any = null;

  constructor(private cryptoService: CryptoService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadStatus();
  }

  ngOnDestroy() {
    if (this.cooldownTimer) clearInterval(this.cooldownTimer);
  }

  loadStatus() {
    this.loadingStatus = true;
    this.cryptoService.getBitpandaStatus().subscribe({
      next: s => {
        this.status = s;
        this.loadingStatus = false;
        this.resumeCooldownIfNeeded(s.lastSyncedAt);
        this.cdr.detectChanges();
      },
      error: () => { this.loadingStatus = false; this.cdr.detectChanges(); }
    });
  }

  private resumeCooldownIfNeeded(lastSyncedAt: string | null) {
    if (!lastSyncedAt) return;
    const elapsed = Math.floor((Date.now() - new Date(lastSyncedAt).getTime()) / 1000);
    const remaining = this.cooldownSeconds - elapsed;
    if (remaining > 0) this.startCooldown(remaining);
  }

  private startCooldown(seconds: number) {
    this.cooldownRemaining = seconds;
    if (this.cooldownTimer) clearInterval(this.cooldownTimer);
    this.cooldownTimer = setInterval(() => {
      this.cooldownRemaining--;
      if (this.cooldownRemaining <= 0) {
        clearInterval(this.cooldownTimer);
        this.cooldownTimer = null;
      }
      this.cdr.detectChanges();
    }, 1000);
  }

  connect() {
    if (!this.apiKey.trim()) return;
    this.connecting = true;
    this.error = null;
    this.cryptoService.saveBitpandaKey(this.apiKey.trim()).subscribe({
      next: s => {
        this.status = s;
        this.apiKey = '';
        this.connecting = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.error = err?.error?.message || 'Could not save the key. Check that it is valid.';
        this.connecting = false;
        this.cdr.detectChanges();
      }
    });
  }

  sync() {
    this.syncing = true;
    this.error = null;
    this.syncResult = null;
    this.cryptoService.syncBitpanda().subscribe({
      next: res => {
        this.syncResult = res;
        this.syncing = false;
        if (this.status) this.status.lastSyncedAt = res.lastSyncedAt;
        this.startCooldown(this.cooldownSeconds);
        this.cdr.detectChanges();
      },
      error: err => {
        this.error = err?.error?.message || 'Sync failed. Check the browser console.';
        this.syncing = false;
        this.cdr.detectChanges();
      }
    });
  }

  disconnect() {
    if (!confirm('Remove your stored Bitpanda API key? Already-imported trades stay in your journal.')) return;
    this.cryptoService.deleteBitpandaKey().subscribe({
      next: () => {
        this.status = { hasKey: false, createdAt: null, lastSyncedAt: null };
        this.syncResult = null;
        this.cdr.detectChanges();
      }
    });
  }
}
