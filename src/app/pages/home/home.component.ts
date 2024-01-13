import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { ROUTES_PATH } from '@core/constants/routes-path.const';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'ds-home',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  logout(): void {
    this.authService.logout();
    void this.router.navigateByUrl(`${ROUTES_PATH.AUTH}/${ROUTES_PATH.LOGIN}`);
  }
}
