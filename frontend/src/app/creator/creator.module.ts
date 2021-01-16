import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CreatorRoutingModule } from './creator-routing.module';
import { CreatorComponent } from './creator.component';



@NgModule({
  declarations: [CreatorComponent],
  imports: [
    SharedModule,
    CreatorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ CreatorComponent ]
})
export class CreatorModule { }
