import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoDashboardComponent } from './dashboard/crypto-dashboard.component';
import { TradeJournalComponent } from './trade-journal/trade-journal.component';
import { CryptoAlertsComponent } from './alerts/crypto-alerts.component';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { BitpandaImportComponent } from './bitpanda-import/bitpanda-import.component';

const routes: Routes = [
  { path: '', redirectTo: 'prices', pathMatch: 'full' },
  { path: 'prices', component: CryptoDashboardComponent },
  { path: 'coin/:coinId', component: CoinDetailComponent },
  { path: 'trades', component: TradeJournalComponent },
  { path: 'alerts', component: CryptoAlertsComponent },
  { path: 'bitpanda', component: BitpandaImportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptoRoutingModule {}
