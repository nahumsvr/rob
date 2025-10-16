import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'work',
    loadComponent: () => import('./pages/work/work').then(m => m.Work)
  },
  {
    path: 'mental',
    loadComponent: () => import('./pages/mental/mental').then(m => m.Mental)
  },
  {
    path: 'sleep',
    loadComponent: () => import('./pages/sleep/sleep').then(m => m.Sleep)
  },
  {
    path: 'clothes',
    loadComponent: () => import('./pages/clothes/clothes').then(m => m.Clothes)
  }
];
