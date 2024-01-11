import { Routes } from "@angular/router";
import { ROUTES_PATH } from "@core/constants/routes-path.const";

export default [
  {
    path: '',
    redirectTo: ROUTES_PATH.LOGIN,
    pathMatch: 'full',
  },
  {
    path: ROUTES_PATH.LOGIN,
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: ROUTES_PATH.REGISTER,
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
  },
] as Routes;