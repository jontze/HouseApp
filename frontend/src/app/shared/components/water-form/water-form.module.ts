import { NgModule } from '@angular/core';
import { ResourceFormModule } from '../form/resource-form.module';

import { WaterFormComponent } from './water-form.component';

@NgModule({
  imports: [ResourceFormModule],
  exports: [WaterFormComponent],
  declarations: [WaterFormComponent],
  providers: [],
})
export class WaterFormModule {}
