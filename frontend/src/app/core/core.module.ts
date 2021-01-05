import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';

const components: any[] = [
  NavigationBarComponent,
  SkeletonComponent
];

@NgModule({
  declarations: [ NavigationBarComponent, FooterComponent, SkeletonComponent ],
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule
  ],
  exports: [ SkeletonComponent ]
})
export class CoreModule { }
