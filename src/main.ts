import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import appRouting from '@app/app.routing';
import { JwtTokenInterceptor } from '@core/interceptors/jwt-token.interceptor';
import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            BrowserModule,
            RouterModule.forRoot(appRouting),
        ),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline', hideRequiredMarker: false }
        },
        provideHttpClient(
            withInterceptors([JwtTokenInterceptor]),
            withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' })
        ),
        provideAnimations()
    ]
})
    .catch(err => console.error(err));
