import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ROUTES_PATH } from "@core/constants/routes-path.const";
import { AuthService } from "@core/services/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private roter: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.authService.token) {
      void this.roter.navigateByUrl(`/${ROUTES_PATH.AUTH}/${ROUTES_PATH.LOGIN}`);
      return next.handle(req);
    }

    req = req.clone({
      setHeaders: {
        'Authorization': `bearer ${this.authService.token}`,
      }
    });

    return next.handle(req).pipe(

    );
  }
}
