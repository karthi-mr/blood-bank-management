import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  private readonly BLOOD_STATUS_UPDATE_API =
    'http://127.0.0.1:8000/api/blood-request/update_status/';

  constructor(private http: HttpClient) {}

  get_blood_request_history(
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

  get_blood_request_requests(): Observable<PatientHistory[]> {
    return this.http.get<PatientHistory[]>(`${this.BLOOD_REQUEST_REQUEST_API}`);
  }

  request_blood(data: RequestBlood): any {
    return this.http.post(`${this.BLOOD_REQUEST_REQUEST_API}`, data);
  }

  update_status_donate_requests(data: { id: number; status: number }): any {
    return this.http.patch(`${this.BLOOD_STATUS_UPDATE_API}`, data);
  }
}
