import { Routes } from '@angular/router';
import {levelSelectedGuard} from "./core/guards/level-selected-guard";
import {puzzleSelectedGuard} from "./core/guards/puzzle-selected-guard";

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
    path: 'auth',
    loadComponent: () => import('./features/auth/auth.page').then( m => m.AuthPage)
  },
  {
    path: 'puzzle',
    loadComponent: () => import('./features/puzzle/puzzle.page').then( m => m.PuzzlePage),
    canActivate: [levelSelectedGuard, puzzleSelectedGuard]
  },
  {
    path: 'levels',
    loadComponent: () => import('./features/levels/levels.page').then( m => m.LevelsPage)
  },
  {
    path: 'puzzles',
    loadComponent: () => import('./features/puzzles/puzzles.page').then(m => m.PuzzlesPage),
    canActivate: [levelSelectedGuard]
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth.page').then( m => m.AuthPage)
  },
];
