import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'puzzle',
    loadComponent: () => import('./features/puzzle/puzzle.page').then( m => m.PuzzlePage)
  },
];
