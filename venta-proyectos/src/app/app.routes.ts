import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'not-found',
    loadComponent: () => import('./not-found/not-found.page').then( m => m.NotFoundPage)
  },
  {
    path: 'compradores',
    loadComponent: () => import('./compradores/compradores.page').then( m => m.CompradoresPage)
  },
  {
    path: 'vendedores',
    loadComponent: () => import('./vendedores/vendedores.page').then( m => m.VendedoresPage)
  },
];
