import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminErrorService {
  //

  constructor() {}

  /* admin creation error */
  addAdminErrorHandle(
    errorRes: HttpErrorResponse
  ): Observable<HttpErrorResponse> {
    let error = 'UNKNOWN_ERROR';
    let errorMessage: string | undefined;
    const userError = errorRes.error.user;
    if (userError) {
      if (userError.username) {
        error = userError.username[0];
      } else if (userError.email) {
        error = userError.email[0];
      } else if (userError.mobile) {
        error = userError.mobile[0];
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
      default:
        errorMessage = 'An unknown error occurred. Please contact support.';
    }
    return throwError(() => new Error(errorMessage));
  }

  commonErrorHandle(errorRes: HttpErrorResponse) {
    let error = 'UNKNOWN_ERROR';
    let errorMessage: string | undefined;

    if (errorRes.status == 0 && errorRes.error instanceof ProgressEvent) {
      error = 'NETWORK_ISSUE';
    }

    switch (error) {
      case 'NETWORK_ISSUE':
        errorMessage = 'Kindly check your network.';
        break;
      default:
        errorMessage = 'An unknown error occurred';
    }
    return throwError(() => new Error(errorMessage));
  }

  addBloodGroupErrorHandle(errorRes: HttpErrorResponse) {
    let error = 'UNKNOWN_ERROR';
    let errorMessage: string | undefined;
    const bloodError = errorRes.error;

    if (errorRes.status == 0 && errorRes.error instanceof ProgressEvent) {
      error = 'NETWORK_ISSUE';
    }

    if (bloodError) {
      if (bloodError.blood_group) {
        error = bloodError.blood_group[0];
      }
    }

    switch (error) {
      case 'NETWORK_ISSUE':
        errorMessage = 'Kindly check your network.';
        break;
      case 'MAX_LIMIT_EXCEED':
        errorMessage = 'Blood group maximum limit length exceeded.';
        break;
      case 'BLOOD_NOT_UNIQUE':
        errorMessage = 'Blood Group with this blood group already registered.';
        break;
      default:
        errorMessage = 'An unknown error occurred';
    }
    return throwError(() => new Error(errorMessage));
  }
}
