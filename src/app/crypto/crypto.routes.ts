import { Routes } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { CryptoDashboardComponent } from './dashboard/crypto-dashboard.component';
import { TradeJournalComponent } from './trade-journal/trade-journal.component';
import { CryptoAlertsComponent } from './alerts/crypto-alerts.component';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { BitpandaImportComponent } from './bitpanda-import/bitpanda-import.component';

export const CRYPTO_ROUTES: Routes = [
  { path: '', redirectTo: 'prices', pathMatch: 'full' },
  { path: 'prices', component: CryptoDashboardComponent },
  {
    path: 'coin/:coinId',
    component: CoinDetailComponent,
    // Chart.js registration only needed where the chart is rendered.
    providers: [provideCharts(withDefaultRegisterables())]
  },
  { path: 'trades', component: TradeJournalComponent },
  { path: 'alerts', component: CryptoAlertsComponent },
  { path: 'bitpanda', component: BitpandaImportComponent }
];
