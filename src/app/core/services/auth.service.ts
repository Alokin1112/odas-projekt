import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthenticationResponse, JwtPayload, LoginDto, RegisterDto, VerificationDto } from '@core/interfaces/auth.interface';
import { LocalStorageService } from '@core/services/local-storage.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { API } from '@core/constants/api.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private localeStorage = inject(LocalStorageService);
  private readonly KeyStorage = "AUTH_TOKEN";

  register(data: RegisterDto): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${environment.httpBackend}${API.REGISTER}`, data);
  }

  login(data: LoginDto): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${environment.httpBackend}${API.LOGIN}`, data);
  }

  verify(data: VerificationDto): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${environment.httpBackend}${API.VERIFY}`, data);
  }

  set token(token: string) {
    this.localeStorage.save(this.KeyStorage, token);
  }
  get token(): string {
    const token = this.getTokenFromLocalStorage();
    if (token && this.isNotExpired()) {
      return token;
    } else {
      this.localeStorage.remove(this.KeyStorage);
      return null;
    }
  }

  get claims(): JwtPayload {
    const token = this.getTokenFromLocalStorage();
    return token ? jwtDecode(token) : null;
  }

  logout(): void {
    this.localeStorage.remove(this.KeyStorage);
  }

  private isNotExpired(): boolean {
    const claims = this.claims;
    return claims ? claims.exp * 1000 > Date.now() : false;
  }

  private getTokenFromLocalStorage(): string {
    return this.localeStorage.get<string>(this.KeyStorage);
  }

}
