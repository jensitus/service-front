import {Injectable} from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthenticationService} from '../../auth/services/authentication.service';
import {Router} from '@angular/router';
import {AlertService} from '../../admin-template/layout/components/alert/services/alert.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService,
    private modalService: NgbModal
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      // A 401 with an expired token often has no response body, so err.error can be null.
      // Read everything from a safe object to avoid throwing inside the handler.
      const body = err.error ?? {};
      if (err.status === 401 || err.status === 403) {
        // auto logout if 401 or 403 response returned from api
        this.authenticationService.logout();
        this.modalService.dismissAll(); // close any open modal so it doesn't linger over the login page
        this.alertService.error(body.message || 'Your session has expired. Please log in again.', true);
        this.router.navigate(['/login']);
      } else if (err.status === 451) {
        this.alertService.error(body.text);
      } else if (err.status === 404) {
        this.alertService.error(body.message);
      } else if (err.status === 409) {
        this.alertService.error('err', true); // das pbuli
      } else if (err.status === 406) {
        this.alertService.error(body.text);
      } else if (err.status === 422) {
        if (body.redirect === true) {
          this.router.navigate(['/login']);
        } else {
          this.alertService.error(body.text, true);
        }
      } else if (err.status === 400) {
        // Spring Boot 3.x (RFC 7807): errors[0].detail
        // Spring Boot 2.x: errors[0].defaultMessage
        // Explicit Message responses: err.error.text
        const msg = body.errors?.[0]?.detail
          || body.errors?.[0]?.defaultMessage
          || body.detail
          || body.text
          || 'Bad request';
        this.alertService.error(msg);
      }

      return throwError(err);
    }));
  }
}
