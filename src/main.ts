import { HttpClientXsrfModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import appRouting from '@app/app.routing';
import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            BrowserModule,
            RouterModule.forRoot(appRouting),
            HttpClientXsrfModule.withOptions({
                cookieName: 'XSRF-TOKEN',
                headerName: 'XSRF-TOKEN',
            }),
        ),
        provideHttpClient(),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline', hideRequiredMarker: false }
        },

        provideAnimations()
    ]
})
    .catch(err => console.error(err));
