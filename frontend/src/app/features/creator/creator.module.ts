import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker/';

import { SharedModule } from '../../shared/shared.module';
import { CreatorRoutingModule } from './creator-routing.module';
import { CreatorComponent } from './pages/creator.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ResultsComponent } from './components/results/results.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [CreatorComponent, ResultsComponent, FormComponent],
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
