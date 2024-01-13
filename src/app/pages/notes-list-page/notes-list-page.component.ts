import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ROUTES_PATH } from '@core/constants/routes-path.const';
import { Note } from '@core/interfaces/notes.interface';
import { CsrfService } from '@core/services/csrf.service';
import { NoteService } from '@core/services/note.service';
import { NotesListComponent } from '@pages/home/components/notes-list/notes-list.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'ds-notes-list-page',
  standalone: true,
  imports: [
    CommonModule, NotesListComponent, MatIconModule, MatButtonModule, RouterModule,
  ],
  templateUrl: './notes-list-page.component.html',
  styleUrl: './notes-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListPageComponent implements OnInit {

  publicNotes$: Observable<Note[]>;
  ownedNotes$: Observable<Note[]>;

  readonly pathToAddNote = `/${ROUTES_PATH.HOME}/${ROUTES_PATH.ADD_NOTE}`;

  constructor(
    private noteService: NoteService,
    private csrfService: CsrfService,
  ) { }

  ngOnInit(): void {
    this.csrfService.getCsrfToken().subscribe((res) => console.log(res));
    this.publicNotes$ = this.noteService.getCombinedNotes();
    this.ownedNotes$ = this.noteService.getOwnedNotes();
  }
}
