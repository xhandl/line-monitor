import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'bagging-line' },
  {
    path: 'bagging-line',
    loadChildren: () => import('@features/bagging-line/bagging-line.routes'),
  },
  { path: '**', redirectTo: 'bagging-line' },
];
