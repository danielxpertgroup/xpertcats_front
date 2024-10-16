import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component'),
    children: [
      {
        path: 'breeds',
        title: 'Breeds of cats',
        loadComponent: () => import('./pages/home/breeds/breeds.component'),
      },
      {
        path: 'auth',
        title: 'Authentication',
        loadComponent: () => import('./pages/home/auth/auth.component'),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
