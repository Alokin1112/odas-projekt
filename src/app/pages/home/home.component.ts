import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JwtTokenInterceptor } from '@core/interceptors/jwt-token.interceptor';

@Component({
  selector: 'ds-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true,
    },
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
