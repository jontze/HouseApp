import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceResolver } from 'src/app/core/resolver/resource.resolver';
import { DashboardComponent } from './pages/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      data: ResourceResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
