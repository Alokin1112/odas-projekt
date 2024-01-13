import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '@core/interfaces/notes.interface';
import { NoteService } from '@core/services/note.service';
import { BehaviorSubject, Observable, map, switchMap, combineLatest } from 'rxjs';

@Component({
  selector: 'ds-details',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
  note$: Observable<Note>;
  submittedPassword$ = new BehaviorSubject<string>(null);

  password = this.fb.control('', [Validators.required]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.note$ = combineLatest([this.route.params, this.submittedPassword$]).pipe(
      map(([params, password]) => ({ id: parseInt(params['id'] as string, 10), password })),
      switchMap((data) => this.noteService.getDetailedNote(data))
    );
  }

  handleSubmit(): void {
    if (this.password.invalid) return;
    this.submittedPassword$.next(this.password.value);
  }
}

