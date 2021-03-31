import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';

import { DashboardComponent } from './pages/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CardComponent } from './components/card/card.component';
import { CompareComponent } from './components/compare/compare.component';
import { NgxChartComponent } from './components/ngx-chart/ngx-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    DashboardComponent,
    CardComponent,
    CompareComponent,
    NgxChartComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    AlertModule.forRoot(),
    NgxChartsModule,
  ],
})
export class DashboardModule {}
