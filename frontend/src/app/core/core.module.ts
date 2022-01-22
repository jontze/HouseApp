import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';

const components: any[] = [NavigationBarComponent, SkeletonComponent];

@NgModule({
  declarations: [NavigationBarComponent, FooterComponent, SkeletonComponent, AlertBoxComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
    AlertModule.forRoot(),
  ],
  exports: [SkeletonComponent],
})
export class CoreModule {}
