import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, BaseChartDirective, ChartsRoutingModule, PageHeaderModule, ChartsComponent],
    providers: [provideCharts(withDefaultRegisterables())]
})
export class ChartsModule {}
