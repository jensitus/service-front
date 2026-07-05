import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Currency = 'EUR' | 'USD';

@Injectable({ providedIn: 'root' })
export class CurrencyPreferenceService {

  private readonly storageKey = 'crypto_currency';
  private _currency$ = new BehaviorSubject<Currency>(this.load());

  get currency$() { return this._currency$.asObservable(); }
  get current(): Currency { return this._currency$.value; }

  toggle() {
    this.set(this._currency$.value === 'EUR' ? 'USD' : 'EUR');
  }

  set(currency: Currency) {
    localStorage.setItem(this.storageKey, currency);
    this._currency$.next(currency);
  }

  symbol(): string { return this._currency$.value === 'EUR' ? '€' : '$'; }

  private load(): Currency {
    return (localStorage.getItem(this.storageKey) as Currency) || 'EUR';
  }
}
