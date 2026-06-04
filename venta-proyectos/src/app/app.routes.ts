import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'compradores',
    loadComponent: () => import('./compradores/compradores.page').then( m => m.CompradoresPage)
  },
  {
    path: 'vendedores',
    loadComponent: () => import('./vendedores/vendedores.page').then( m => m.VendedoresPage)
  },
  {
    path: 'not-found',
    loadComponent: () => import('./not-found/not-found.page').then( m => m.NotFoundPage)
  },
  {
    path: '**', // Esta ruta comodín atrapa cualquier URL mal escrita y la manda al not-found
    redirectTo: 'not-found'
  }
];