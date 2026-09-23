import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Login } from './pages/login/login';
import { Mapa } from './pages/mapa/mapa';
import { Guia } from './pages/guia/guia';
import { Conquistas } from './pages/conquistas/conquistas';
import { Cadastro } from './paginas/cadastro/cadastro';


import { authGuard } from './auth/auth-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },


  { path: 'mapa', component: Mapa, canActivate: [authGuard] },
  { path: 'guia', component: Guia, canActivate: [authGuard] },
  { path: 'conquistas', component: Conquistas, canActivate: [authGuard] },
  { path: '**', redirectTo: 'inicio' }
];