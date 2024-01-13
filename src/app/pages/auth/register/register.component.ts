import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ROUTES_PATH } from '@core/constants/routes-path.const';
import { RegisterDto } from '@core/interfaces/auth.interface';
import { AuthService } from '@core/services/auth.service';
import { passwordCannotBeEqualToUsernameValidator, passwordMatchValidator } from '@pages/auth/validators/passwords-must-match.validator';
import { Observable, Subject, catchError, map, of, takeUntil } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'ds-register',
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
    MatProgressBarModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {

  photoBase64: string;
  pathToLogin = `/${ROUTES_PATH.AUTH}/${ROUTES_PATH.LOGIN}`;
  onDestroy$ = new Subject<void>();
  entropy$: Observable<number>;

  private readonly patternForForm = /^[a-zA-Z_0-9!@#$%]{6,255}$/;

  form = this.fb.group({
    username: [null as string, [Validators.required, Validators.minLength(6), Validators.maxLength(255), Validators.pattern(this.patternForForm)]],
    password: [null as string, [Validators.required, Validators.minLength(6), Validators.maxLength(255), Validators.pattern(this.patternForForm)]],
    repeatPassword: [null as string, [Validators.required, Validators.minLength(6), Validators.maxLength(255), Validators.pattern(this.patternForForm)]],
  }, { validators: [passwordMatchValidator, passwordCannotBeEqualToUsernameValidator] });


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.entropy$ = this.form.get('password').valueChanges.pipe(map((password) => password ? this.countPasswordEntropy(password) : 0));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  handleSubmit() {
    if (this.form.valid) {
      this.authService.register(this.form.value as RegisterDto).pipe(
        take(1),
        map((res) => res.tfaPhoto),
        catchError(() => of(null))
      ).subscribe((photoBase64) => {
        this.form.reset();
        this.form.markAsUntouched();
        this.photoBase64 = photoBase64;
      });
    }
  }

  private countPasswordEntropy(word: string): number {
    const charCount: Record<string, number> = {};
    const wordLength = word.length;

    // Oblicz częstość występowania każdego znaku w słowie
    for (const char of word) {
      charCount[char] = (charCount[char] || 0) + 1;
    }

    // Oblicz prawdopodobieństwo wystąpienia każdego znaku
    const probabilities = Object.values(charCount).map(count => count / wordLength);

    // Oblicz entropię na podstawie wzoru: H(X) = -Σ P(x) * log2(P(x))
    const entropy = probabilities.reduce((sum, probability) => {
      return sum - probability * Math.log2(probability);
    }, 0);

    return entropy;
  }
}
