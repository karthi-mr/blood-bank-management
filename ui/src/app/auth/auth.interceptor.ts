import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // this.authService.auto_login();
    const token = this.authService.get_access_token();
    if(this.authService.is_access_token_expired()) {
      this.authService.auto_login();
    }
    if (token){
      const modifiedReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    })
    return next.handle(modifiedReq);
  }
  return next.handle(request);
  }
}
