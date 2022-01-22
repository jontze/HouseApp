import { NgModule } from '@angular/core';
import { ResourceFormModule } from '../form/resource-form.module';

import { OilFormComponent } from './oil-form.component';

@NgModule({
  imports: [ResourceFormModule],
  exports: [OilFormComponent],
  declarations: [OilFormComponent],
  providers: [],
})
export class OilFormModule {}
