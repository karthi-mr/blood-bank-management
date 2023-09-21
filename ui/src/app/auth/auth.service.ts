import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthToken, JWTToken, LoginUser, RegisterUser } from './auth.model';
import { Subject, catchError, tap, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_API = "http://127.0.0.1:8000/auth/";
  isLoggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // handling error in login
  private login_handle_error(errorRes: HttpErrorResponse) {  
    let errorMessage = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error) {
      case 'USER_NOT_EXISTS':
        errorMessage =
          'User does not exists. Please enter correct username.';
        break;
      case 'WRONG_PASSWORD':
        errorMessage =
          'You have entered wrong password.';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }   

  // handling error in registration
  private register_handle_error(errorRes: HttpErrorResponse) {  
    let errorMessage = 'An unknown error occurred';
    if (!errorRes.error) {
      return throwError(() => new Error(errorMessage));
    }
    if(errorRes.error.username) {
      errorMessage = errorRes.error.username[0];
    }
    else if(errorRes.error.email) {
      errorMessage = errorRes.error.email[0];
    }
    else if(errorRes.error.mobile) {
      errorMessage = errorRes.error.mobile[0];
    }
    return throwError(() => new Error(errorMessage)); 
  }


  login_user(loginUser: LoginUser): any {
    return this.http.post<AuthToken>(`${this.AUTH_API}login/`, loginUser).pipe(
      catchError(this.login_handle_error),
      tap((resData: AuthToken) => {
        localStorage.setItem('access', resData.auth_token.access);
        localStorage.setItem('refresh', resData.auth_token.refresh);
        this.isLoggedIn.next(true);
      })
    )
  }

   /* register user */
   register_user(data: RegisterUser): any {
    if(data.user.user_type == 2) {
      return this.http.post<{message: string}>(`${this.AUTH_API}donor/`, data).pipe(
        catchError(this.register_handle_error)
      )
    }
    else {
      return this.http.post<{message: string}>(`${this.AUTH_API}patient/`, data).pipe(
        catchError(this.register_handle_error)
      )
    }
  }

  logout_user(): void {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    this.isLoggedIn.next(false)
  }

  private refresh_access_token(token: string | null): void {
    if(token)
    {
      this.http.post(`${this.AUTH_API}login/refresh/`, {'refresh': token}).subscribe({
        next: (resData: any) => {
          localStorage.setItem('access', resData.access)
        }
      })
    }
  }

  auto_login(): boolean {
    if(this.get_access_token() != null) {
      if(this.is_access_token_expired()) {
        if(!this.is_refresh_token_expired()) {
          this.refresh_access_token(this.get_refresh_token());
          return true;
        }
        else {
          this.logout_user();
          return false;
        }
      }
      else {
        this.isLoggedIn.next(true);
        return true;
      }
    }
    else {
      return false;
    }
  }

  private is_token_expired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  get_access_token(): string | null {
    return localStorage.getItem('access')
  }

  get_refresh_token(): string | null {
    return localStorage.getItem('refresh')
  }

  decode_token(token: string): JWTToken | null {
    try {
      return jwt_decode(token);
    }
    catch(Error) {
      return null;
    }
  }

  is_access_token_expired(): boolean {
    const accessToken = this.get_access_token();
    if (accessToken != null) {
      // const c1 = this.decode_token(accessToken);
      return this.is_token_expired(accessToken); 
    }
    return false
  }

  is_refresh_token_expired(): boolean {
    const refreshToken = this.get_refresh_token();
    if (refreshToken != null) {
      // const c1 = this.decode_token(refreshToken);
      return this.is_token_expired(refreshToken);
    }
    return false
  }
}
