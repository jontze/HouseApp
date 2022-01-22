import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceResolver } from 'src/app/core/resolver/resource.resolver';
import { TablePageComponent } from './pages/table-page/table-page.component';

const routes: Routes = [
  {
    path: '',
    component: TablePageComponent,
    resolve: { data: ResourceResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverviewRoutingModule {}
