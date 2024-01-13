import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { CsrfService } from "@core/services/csrf.service";
import { Observable, switchMap } from "rxjs";


export const XSRFInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  const csrfService = inject(CsrfService);

  if (req.method !== 'GET') {
    return csrfService.getCsrfToken().pipe(
      switchMap((csrf) => {
        req = req.clone({
          setHeaders: {
            [csrf.headerName]: csrf?.token,
          }
        });
        return next(req);
      })
    );

  } else {
    return next(req);
  }

}
