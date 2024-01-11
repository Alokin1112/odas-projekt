import { Routes } from "@angular/router";
import { AppComponent } from "@app/app.component";
import { ROUTES_PATH } from "@core/constants/routes-path.const";
import { authGuard } from "@core/guards/auth.guard";

export default [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: AppComponent,
    canActivate: [authGuard],
  },
  {
    path: ROUTES_PATH.AUTH,
    loadChildren: () => import('./pages/auth/auth.routing')
  }
] as Routes;