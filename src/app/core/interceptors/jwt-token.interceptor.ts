import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { ROUTES_PATH } from "@core/constants/routes-path.const";
import { AuthService } from "@core/services/auth.service";
import { Observable } from "rxjs";


export const JwtTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (req.url.includes('/api/v1/auth')) {
    return next(req);
  }

  if (!authService.token) {
    void router.navigateByUrl(`/${ROUTES_PATH.AUTH}/${ROUTES_PATH.LOGIN}`);
    return next(req);
  }

  req = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${authService.token}`,
    }
  });

  return next(req);
}