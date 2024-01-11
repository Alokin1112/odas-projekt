import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { ROUTES_PATH } from '@core/constants/routes-path.const';
import { AuthService } from '@core/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.token ? true : router.createUrlTree([`/${ROUTES_PATH.AUTH}/${ROUTES_PATH.LOGIN}`]);
};
