import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Note } from '@core/interfaces/notes.interface';

@Component({
  selector: 'ds-notes-list',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, RouterModule, MatIconModule
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListComponent {

  @Input() dsNotes: Note[];
}
