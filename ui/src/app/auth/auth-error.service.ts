import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthErrorService {
  //

  constructor() {}

  /* login error handling */
  loginErrorHandle(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error) {
      case 'USER_NOT_EXISTS':
        errorMessage = 'User does not exists. Please enter correct username.';
        break;
      case 'WRONG_PASSWORD':
        errorMessage = 'You have entered wrong password.';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

  /* registration error handling */
  registerErrorHandle(
    errorRes: HttpErrorResponse
  ): Observable<HttpErrorResponse> {
    let error = 'UNKNOWN_ERROR';
    let errorMessage: string | undefined;
    const userError = errorRes.error.user;
    const donorError = errorRes.error;
    if (userError) {
      if (userError.username) {
        error = userError.username[0];
      } else if (userError.email) {
        error = userError.email[0];
      } else if (userError.mobile) {
        error = userError.mobile[0];
      } else if (userError.address) {
        error = userError.address[0];
      }
    } else if (donorError) {
      if (donorError.date_of_birth) {
        error = donorError.date_of_birth[0];
      }
    }
    switch (error) {
      case 'USERNAME_NOT_VALID':
        errorMessage =
          'You have entered invalid username. Please enter valid username';
        break;
      case 'USER_ALREADY_PRESENT':
        errorMessage = 'Entered Username already registered.';
        break;
      case 'EMAIL_ALREADY_PRESENT':
        errorMessage = 'Entered Email already registered.';
        break;
      case 'MOBILE_ALREADY_PRESENT':
        errorMessage = 'Entered Mobile number already registered.';
        break;
      case 'OTHER_THAN_NUMBER':
        errorMessage = 'Mobile number must contain numbers only.';
        break;
      case 'LENGTH_NOT_TEN':
        errorMessage = 'Mobile number must contain 10 digits only.';
        break;
      case 'INVALID_DOB':
        errorMessage = 'You have entered invalid "Date Of Birth".';
        break;
      case 'MAX_LIMIT_EXCEED':
        errorMessage = 'Maximum length limit exceeded.';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'You have entered invalid email address.';
        break;
      default:
        errorMessage = 'An unknown error occurred. Please contact support.';
    }
    return throwError(() => new Error(errorMessage));
  }
}
