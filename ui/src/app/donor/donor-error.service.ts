import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonorErrorService {
  //

  constructor() {}

  donateBloodErrorHandle(errorRes: HttpErrorResponse) {
    let error = 'UNKNOWN_ERROR';
    let errorMessage: string | undefined;
    const donateBloodError = errorRes.error;

    if (errorRes.status == 0 && errorRes.error instanceof ProgressEvent) {
      error = 'NETWORK_ISSUE';
    }
    if (donateBloodError) {
      if (donateBloodError.age) {
        error = donateBloodError.age[0];
      }
      if (donateBloodError.unit) {
        error = donateBloodError.unit[0];
      }
    }

    switch (error) {
      case 'NETWORK_ISSUE':
        errorMessage = 'Kindly check your network.';
        break;
      case 'AGE_LESS_THAN_12':
        errorMessage =
          'Age should be greater than or equal to  12 for donating blood.';
        break;
      case 'AGE_GREATER_THAN_60':
        errorMessage =
          'Age should be less than or equal to 60 for donating blood.';
        break;
      case 'UNIT_GREATER_THAN_2':
        errorMessage = 'Unit should not be greater than 2.';
        break;
      default:
        errorMessage = 'An unknown error occurred';
    }
    return throwError(() => new Error(errorMessage));
  }
}
