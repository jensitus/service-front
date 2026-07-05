import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, withXhr, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { JwtInterceptor } from './auth/helpers/jwt.interceptor';
import { ErrorInterceptor } from './common/helper/error.interceptor';
import { AuthGuard } from './auth/guards/auth.guard';
import { UserService } from './auth/services/user.service';
import { AuthenticationService } from './auth/services/authentication.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    provideAnimations(),
    AuthGuard,
    UserService,
    AuthenticationService,
  ]
};
