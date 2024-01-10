import { Routes } from "@angular/router";
import { AppComponent } from "@app/app.component";

export default [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: AppComponent,
  }
] as Routes;