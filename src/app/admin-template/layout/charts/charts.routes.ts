import { Routes } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartsComponent } from './charts.component';

export const CHARTS_ROUTES: Routes = [
  {
    path: '',
    component: ChartsComponent,
    providers: [provideCharts(withDefaultRegisterables())]
  }
];
