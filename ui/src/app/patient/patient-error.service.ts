import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientErrorService {
  //

  constructor() {}

  requestBloodErrorHandle(errorRes: HttpErrorResponse) {
    let error = 'UNKNOWN_ERROR';
    let errorMessage: string | undefined;
    const requestBloodError = errorRes.error;

    if (errorRes.status == 0 && errorRes.error instanceof ProgressEvent) {
      error = 'NETWORK_ISSUE';
    }
    if (requestBloodError) {
      if (requestBloodError.patient_age) {
        error = requestBloodError.patient_age[0];
      }
      if (requestBloodError.unit) {
        error = requestBloodError.unit[0];
      }
    }

    switch (error) {
      case 'NETWORK_ISSUE':
        errorMessage = 'Kindly check your network.';
        break;
      case 'AGE_GREATER_THAN_120':
        errorMessage =
          'Age should be less than or equal to 120 for donating blood. If any issue, please contact support.';
        break;
      case 'UNIT_GREATER_THAN_20':
        errorMessage =
          'Unit should not be greater than 20. If any issue, please contact support.';
        break;
      default:
        errorMessage = 'An unknown error occurred.';
    }
    return throwError(() => new Error(errorMessage));
  }
}
