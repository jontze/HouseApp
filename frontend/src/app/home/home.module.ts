import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ChartComponent } from './chart/chart.component';
import { CompareComponent } from './compare/compare.component';



@NgModule({
  declarations: [HomeComponent, ChartComponent, CompareComponent],
  imports: [
    AngularMaterialModule,
    HomeRoutingModule
  ],
  providers: [ HomeComponent ]
})
export class HomeModule { }
