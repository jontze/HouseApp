import { NgModule } from '@angular/core';
import { ResourceFormModule } from '../form/resource-form.module';

import { PowerFormComponent } from './power-form.component';

@NgModule({
  imports: [ResourceFormModule],
  exports: [PowerFormComponent],
  declarations: [PowerFormComponent],
  providers: [],
})
export class PowerFormModule {}
