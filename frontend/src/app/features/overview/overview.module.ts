import { NgModule } from '@angular/core';
import { TablePageComponent } from './pages/table-page/table-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverviewRoutingModule } from './overview-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ActionComponent } from './components/action/action.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { EditWindowComponent } from './components/edit-window/edit-window.component';
import { InteractiveTableComponent } from './components/interactive-table/interactive-table.component';
import { PowerFormModule } from 'src/app/shared/components/power-form/power-form.module';
import { WaterFormModule } from 'src/app/shared/components/water-form/water-form.module';
import { OilFormModule } from 'src/app/shared/components/oil-form/oil-form.module';

@NgModule({
  declarations: [
    TablePageComponent,
    ActionComponent,
    ConfirmDeleteComponent,
    EditWindowComponent,
    InteractiveTableComponent,
  ],
  imports: [
    SharedModule,
    OverviewRoutingModule,
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    NgxDatatableModule,
    PowerFormModule,
    WaterFormModule,
    OilFormModule,
  ],
})
export class OverviewModule {}
