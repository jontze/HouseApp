import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

const components: any[] = [
  NavComponent,
  NavigationBarComponent,
  HomeComponent
];

@NgModule({
  declarations: [ NavComponent, NavigationBarComponent ],
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule
  ],
  exports: [ NavComponent ]
})
export class CoreModule { }
