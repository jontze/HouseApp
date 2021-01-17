import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CardComponent } from './card/card.component';
import { ChartComponent } from './chart/chart.component';
import { CompareComponent } from './compare/compare.component';



@NgModule({
  declarations: [DashboardComponent, CardComponent, ChartComponent, CompareComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
