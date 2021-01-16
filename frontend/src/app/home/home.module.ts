import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ChartComponent } from './chart/chart.component';
import { CompareComponent } from './compare/compare.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [HomeComponent, ChartComponent, CompareComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  providers: [ HomeComponent ]
})
export class HomeModule { }
