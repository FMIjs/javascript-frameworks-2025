import { Routes } from '@angular/router';

import { FlowerBedComponent } from './components/flower-bed/flower-bed.component';

export const routes: Routes = [
  { path : '', redirectTo: 'flower-bed', pathMatch: 'full' },
  {
    path: 'flower-bed',
    component: FlowerBedComponent,
    children: [
      {
        path: 'add',
        loadComponent: () => import('./components/flower-form/flower-form.component').then(m => m.FlowerFormComponent)
      }
    ]
  }
];
