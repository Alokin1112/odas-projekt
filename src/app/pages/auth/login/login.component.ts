import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ROUTES_PATH } from '@core/constants/routes-path.const';
import { LoginDto, RegisterDto, VerificationDto } from '@core/interfaces/auth.interface';
import { AuthService } from '@core/services/auth.service';
import { Subject, takeUntil, take, map, catchError, of } from 'rxjs';

@Component({
  selector: 'ds-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  token: string;


  registerLink = `/${ROUTES_PATH.AUTH}/${ROUTES_PATH.REGISTER}`;
  private readonly patternForForm = /^[a-zA-Z_0-9!@#$%]{6,255}$/;

  tfaControl = this.fb.control(null as string, [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(/^[0-9]{6}$/)]);

  form = this.fb.group({
    username: [null as string, [Validators.required, Validators.minLength(6), Validators.maxLength(255), Validators.pattern(this.patternForForm)]],
    password: [null as string, [Validators.required, Validators.minLength(6), Validators.maxLength(255), Validators.pattern(this.patternForForm)]],
  },);


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
  ) { }

  handleSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value as LoginDto).pipe(
        take(1),
        map((res) => res.token),
        catchError(() => {
          this.form.reset();
          this.form.markAsUntouched();
          return of(null);
        })
      ).subscribe((token) => {
        this.token = token;
        this.cdRef.detectChanges();
      });
    }
  }

  handleTokenSubmit() {
    if (!(this.form.valid && !!this.token && this.tfaControl.valid))
      return;
    const requestBody: VerificationDto = {
      username: this.form.get('username').value,
      password: this.form.get('password').value,
      token: this.token,
      code: this.tfaControl.value,
    };
    this.authService.verify(requestBody).pipe(
      take(1),
      map((res) => res.token),
      catchError(() => {
        this.form.reset();
        this.form.markAsUntouched();
        return of(null);
      })
    ).subscribe((token) => {
      if (token) {
        this.authService.token = token;
        void this.router.navigateByUrl(`/${ROUTES_PATH.HOME}`);
      }
    });
  }

}
