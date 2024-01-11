import { Routes } from "@angular/router";
import { AppComponent } from "@app/app.component";
import { ROUTES_PATH } from "@core/constants/routes-path.const";
import { authGuard } from "@core/guards/auth.guard";
import { AdminUsersListComponent } from "@pages/admin-users-list/admin-users-list.component";
import { DetailsComponent } from "@pages/details/details.component";
import { HomeComponent } from "@pages/home/home.component";
import { InsecureDataComponent } from "@pages/insecure-data/insecure-data.component";

export default [
  {
    path: '',
    redirectTo: ROUTES_PATH.HOME,
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: ROUTES_PATH.HOME,
        component: HomeComponent,
        canActivate: [authGuard],
      },
      {
        path: ROUTES_PATH.DETAILS,
        component: DetailsComponent,
      },
      {
        path: ROUTES_PATH.INSECURE_DATA,
        component: InsecureDataComponent,
      },
      {
        path: ROUTES_PATH.ADMIN_USERS_LIST,
        component: AdminUsersListComponent,
      },
      {
        path: ROUTES_PATH.AUTH,
        loadChildren: () => import('./pages/auth/auth.routing')
      }
    ]
  },
] as Routes;