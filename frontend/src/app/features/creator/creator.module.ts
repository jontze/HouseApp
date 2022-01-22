import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from '../../shared/shared.module';
import { CreatorRoutingModule } from './creator-routing.module';
import { CreatorComponent } from './pages/creator.component';
import { ResultsComponent } from './components/results/results.component';
import { OilFormModule } from 'src/app/shared/components/oil-form/oil-form.module';
import { WaterFormModule } from 'src/app/shared/components/water-form/water-form.module';
import { PowerFormModule } from 'src/app/shared/components/power-form/power-form.module';

@NgModule({
  declarations: [CreatorComponent, ResultsComponent],
  imports: [
    SharedModule,
    CreatorRoutingModule,
    TabsModule.forRoot(),
    OilFormModule,
    WaterFormModule,
    PowerFormModule,
  ],
  providers: [CreatorComponent],
})
export class CreatorModule {}
