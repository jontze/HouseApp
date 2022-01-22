import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'daten',
    loadChildren: () =>
      import('./features/creator/creator.module').then((m) => m.CreatorModule),
  },
  {
    path: 'uebersicht',
    loadChildren: () =>
      import('./features/overview/overview.module').then(
        (m) => m.OverviewModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
