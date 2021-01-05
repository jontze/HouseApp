import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    AngularMaterialModule,
    HomeRoutingModule
  ],
  providers: [ HomeComponent ]
})
export class HomeModule { }
