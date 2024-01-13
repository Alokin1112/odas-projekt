import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, SecurityContext } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NoteService } from '@core/services/note.service';
import { NoteDto } from '@core/interfaces/notes.interface';
import { Router } from '@angular/router';
import { catchError, of, take } from 'rxjs';
import { ROUTES_PATH } from '@core/constants/routes-path.const';

@Component({
  selector: 'ds-add-note',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AddNoteComponent {

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    text: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4096)]],
    isEncrypted: [false, Validators.required],
    isPublic: [false, Validators.required],
    password: [''],
    allowedUsers: this.fb.array<string>([]),
  }, { validators: [ecryptedNoteMustHavePassword, ecryptedNoteCannotHaveAllowedUsersOrBePublic] });

  isSubmitDisabled = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private noteService: NoteService
  ) { }

  get allowedUsersControls(): AbstractControl[] {
    return (this.form.get('allowedUsers') as FormArray).controls || [];
  }

  addAllowedUser(): void {
    (this.form.get('allowedUsers') as FormArray).push(this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(255), Validators.pattern(/^[a-zA-Z_0-9!@#$%]{6,255}$/)]));
  }

  removeAllowedUser(index: number): void {
    (this.form.get('allowedUsers') as FormArray).removeAt(index);
  }

  handleSubmit(): void {
    if (this.form.invalid) return;
    const note: NoteDto = this.form.value as NoteDto;
    this.isSubmitDisabled = true;
    this.noteService.saveNote(note).pipe(
      take(1),
      catchError(() => { return of(null) }),
    ).subscribe((note) => {
      if (note) {
        void this.router.navigateByUrl(`/${ROUTES_PATH.HOME}`);
      } else {
        this.form.reset();
        this.isSubmitDisabled = false;
      }
    });

  }

}


export const ecryptedNoteMustHavePassword: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
  const isEncrypted = control.get('isEncrypted')?.value as boolean;
  const password = control.get('password')?.value as string;

  return isEncrypted && !password ? { encryptedNoteMustHavePassword: true } : null;
};

export const ecryptedNoteCannotHaveAllowedUsersOrBePublic: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
  const isEncrypted = control.get('isEncrypted')?.value as boolean;
  const isPublic = control.get('isPublic')?.value as boolean;
  const allowedUsers = control.get('allowedUsers')?.value as string[];

  return isEncrypted && (isPublic || allowedUsers.length > 0) ? { encryptedNoteCannotHaveAllowedUsersOrBePublic: true } : null;
};

