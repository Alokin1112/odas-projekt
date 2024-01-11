import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ds-admin-users-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './admin-users-list.component.html',
  styleUrl: './admin-users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUsersListComponent { }
