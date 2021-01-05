import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CreatorRoutingModule } from './creator-routing.module';
import { CreatorComponent } from './creator.component';



@NgModule({
  declarations: [CreatorComponent],
  imports: [
    AngularMaterialModule,
    CreatorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ CreatorComponent ]
})
export class CreatorModule { }
