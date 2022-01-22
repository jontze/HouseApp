import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ResourceFormComponent } from './resource-form.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [ResourceFormComponent],
  declarations: [ResourceFormComponent],
  providers: [],
})
export class ResourceFormModule {}
