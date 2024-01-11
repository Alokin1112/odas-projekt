import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ds-insecure-data',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './insecure-data.component.html',
  styleUrl: './insecure-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsecureDataComponent implements OnInit {

  list: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  ngOnInit(): void {
    this.openNew();
  }

  openNew(): void {
    setTimeout(() => {
      const newWindow = window.open('https://pbs.twimg.com/profile_images/796027631342854144/qy-k7Pm6_400x400.jpg', '_blank');
      if (newWindow) {
        newWindow.opener = null;  // Ensure no reference to the current window
      }
      this.openNew();
    }, 1500)
  }
}