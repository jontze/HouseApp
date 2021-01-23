import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker/';

import { SharedModule } from '../shared/shared.module';
import { CreatorRoutingModule } from './creator-routing.module';
import { CreatorComponent } from './creator.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [CreatorComponent, ResultsComponent],
  imports: [
    SharedModule,
    CreatorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [CreatorComponent],
})
export class CreatorModule {}
