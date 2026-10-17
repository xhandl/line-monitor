import { Routes } from '@angular/router';
import { BaggingLine } from './bagging-line';
import { BaggingLineService } from './data-access/bagging-line.service';

export default [
  {
    path: '',
    component: BaggingLine,
    providers: [BaggingLineService],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
      {
        path: 'overview',
        title: 'Bagging Line – Overview',
        loadComponent: () => import('./pages/overview/overview').then((m) => m.Overview),
      },
    ],
  },
] satisfies Routes;
