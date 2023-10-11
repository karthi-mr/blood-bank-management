import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthToken, JWTToken, LoginUser, RegisterUser } from './auth.model';
import { Observable, Subject, catchError, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AuthErrorService } from './auth-error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_API = 'http://127.0.0.1:8000/auth/';
  isLoggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private authErrorService: AuthErrorService
  ) {}

  /* login user */
  login_user(loginUser: LoginUser): any {
    return this.http.post<AuthToken>(`${this.AUTH_API}login/`, loginUser).pipe(
      catchError(this.authErrorService.loginErrorHandle),
      tap((resData: AuthToken) => {
        localStorage.setItem('access', resData.auth_token.access);
        localStorage.setItem('refresh', resData.auth_token.refresh);
        this.isLoggedIn.next(true);
      })
    );
  }

  /* register user */
  register_user(data: RegisterUser): Observable<{ message: string }> {
    if (data.user.user_type == 2) {
      return this.http
        .post<{ message: string }>(`${this.AUTH_API}donor/`, data)
        .pipe(catchError(this.authErrorService.registerErrorHandle));
    } else {
      return this.http
        .post<{ message: string }>(`${this.AUTH_API}patient/`, data)
        .pipe(catchError(this.authErrorService.registerErrorHandle));
    }
  }

  /* logout user */
  logout_user(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.isLoggedIn.next(false);
  }

  /* access token refresh */
  private refresh_access_token(token: string | null): void {
    if (token) {
      this.http
        .post(`${this.AUTH_API}login/refresh/`, { refresh: token })
        .subscribe({
          next: (resData: any) => {
            localStorage.setItem('access', resData.access);
          },
        });
    }
  }

  /* auto login */
  auto_login(): boolean {
    if (this.get_access_token() != null) {
      if (this.is_access_token_expired()) {
        if (!this.is_refresh_token_expired()) {
          this.refresh_access_token(this.get_refresh_token());
          return true;
        } else {
          this.logout_user();
          return false;
        }
      } else {
        this.isLoggedIn.next(true);
        return true;
      }
    } else {
      return false;
    }
  }

  /* check token expired or not */
  private is_token_expired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  /* get access token */
  get_access_token(): string | null {
    return localStorage.getItem('access');
  }

  /* get refresh token */
  get_refresh_token(): string | null {
    return localStorage.getItem('refresh');
  }

  /* decode string token to json token */
  decode_token(token: string | null): JWTToken | null {
    try {
      if (token) return jwt_decode(token);
      return null;
    } catch (Error) {
      return null;
    }
  }

  /* check access token expired */
  is_access_token_expired(): boolean {
    const accessToken = this.get_access_token();
    if (accessToken != null) {
      // const c1 = this.decode_token(accessToken);
      return this.is_token_expired(accessToken);
    }
    return false;
  }

  /* check refresh token expired */
  is_refresh_token_expired(): boolean {
    const refreshToken = this.get_refresh_token();
    if (refreshToken != null) {
      // const c1 = this.decode_token(refreshToken);
      return this.is_token_expired(refreshToken);
    }
    return false;
  }

  /* get login user user type */
  get_user_type(): number | undefined {
    const token = this.get_access_token();
    return this.decode_token(token)?.user_type;
  }

  /* get login user profile name */
  get_profile_name(): string | undefined {
    const token = this.get_access_token();
    return this.decode_token(token)?.username;
  }
}
