import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ROUTES_PATH } from '@core/constants/routes-path.const';
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

  linkToDetails = `/${ROUTES_PATH.HOME}/${ROUTES_PATH.DETAILS}/`;
}
