import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@core/constants/api.const';
import { CsrfInterface } from '@core/interfaces/auth.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {

  constructor(private http: HttpClient) { }

  getCsrfToken(): Observable<CsrfInterface> {
    return this.http.get<CsrfInterface>(`${environment.httpBackend}${API.CRSF_TOKEN}`);
  }

}
