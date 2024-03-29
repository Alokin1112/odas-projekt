import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value as string;
  const repeatPassword = control.get('repeatPassword')?.value as string;

  return password !== repeatPassword ? { passwordMismatch: true } : null;
}

export const passwordCannotBeEqualToUsernameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value as string;
  const username = control.get('username')?.value as string;
  return password === username ? { passwordEqualToUsername: true } : null;
}