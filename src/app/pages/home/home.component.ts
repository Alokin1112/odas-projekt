import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Note } from '@core/interfaces/notes.interface';
import { NoteService } from '@core/services/note.service';
import { NotesListComponent } from '@pages/home/components/notes-list/notes-list.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'ds-home',
  standalone: true,
  imports: [
    CommonModule, NotesListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  publicNotes$: Observable<Note[]>;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.publicNotes$ = this.noteService.getCombinedNotes();
  }
}
