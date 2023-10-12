import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { PatientErrorService } from './patient-error.service';
import {
  BloodRequestHistoryView,
  PatientHistory,
  RequestBlood,
} from './patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private readonly BLOOD_REQUEST_HISTORY_API =
    'http://127.0.0.1:8000/api/blood-request-history/';
  private readonly BLOOD_REQUEST_REQUEST_API =
    'http://127.0.0.1:8000/api/blood-request/';

  constructor(
    private http: HttpClient,
    private patientErrorService: PatientErrorService
  ) {}

  bloodRequestHistoryList(
    link: string | null,
    order: string | null
  ): Observable<BloodRequestHistoryView> {
    if (link) {
      return this.http.get<BloodRequestHistoryView>(`${link}`);
    }
    return this.http.get<BloodRequestHistoryView>(
      `${this.BLOOD_REQUEST_HISTORY_API}?${order}`
    );
  }

  bloodRequestList(): Observable<PatientHistory[]> {
    return this.http.get<PatientHistory[]>(`${this.BLOOD_REQUEST_REQUEST_API}`);
  }

  requestBlood(data: RequestBlood): any {
    return this.http
      .post(`${this.BLOOD_REQUEST_REQUEST_API}`, data)
      .pipe(catchError(this.patientErrorService.requestBloodErrorHandle));
  }

  updateRequestStatus(data: { id: number; status: number }): any {
    return this.http.patch(
      `${this.BLOOD_REQUEST_REQUEST_API}update_status/`,
      data
    );
  }

  updateRequestRejectReason(data: { id: number; reject_reason: string }): any {
    return this.http.patch(
      `${this.BLOOD_REQUEST_REQUEST_API}update_reason/`,
      data
    );
  }

  bloodRequestHistoryDetail(
    id: number
  ): Observable<{ result: PatientHistory }> {
    return this.http.get<{ result: PatientHistory }>(
      `${this.BLOOD_REQUEST_HISTORY_API}${id}/`
    );
  }
}
