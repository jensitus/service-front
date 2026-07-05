import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { CryptoRoutingModule } from './crypto-routing.module';
import { CryptoDashboardComponent } from './dashboard/crypto-dashboard.component';
import { TradeJournalComponent } from './trade-journal/trade-journal.component';
import { CryptoAlertsComponent } from './alerts/crypto-alerts.component';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { BitpandaImportComponent } from './bitpanda-import/bitpanda-import.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CryptoDashboardComponent,
    TradeJournalComponent,
    CryptoAlertsComponent,
    CoinDetailComponent,
    BitpandaImportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BaseChartDirective,
    CryptoRoutingModule,
    FaIconComponent
  ],
  providers: [provideCharts(withDefaultRegisterables())]
})
export class CryptoModule {}
