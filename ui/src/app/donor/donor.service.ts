import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { DonorErrorService } from './donor-error.service';
import { DonateBlood, DonateHistory, DonateHistoryView } from './donor.model';

@Injectable({
  providedIn: 'root',
})
export class DonorService {
  private readonly BLOOD_DONATE_HISTORY_API =
    'http://127.0.0.1:8000/api/donate-blood-history/';
  private readonly BLOOD_DONATE_API = 'http://127.0.0.1:8000/api/donate-blood/';

  constructor(
    private http: HttpClient,
    private donorErrorService: DonorErrorService
  ) {}

  donateBloodHistory(
    link: string | null,
    order: string | null
  ): Observable<DonateHistoryView> {
    if (link) {
      return this.http.get<DonateHistoryView>(`${link}`);
    }
    return this.http.get<DonateHistoryView>(
      `${this.BLOOD_DONATE_HISTORY_API}?${order}`
    );
  }

  donateBloodRequest(): Observable<DonateHistory[]> {
    return this.http.get<DonateHistory[]>(`${this.BLOOD_DONATE_API}`);
  }

  donateBlood(data: DonateBlood): any {
    return this.http
      .post(`${this.BLOOD_DONATE_API}`, data)
      .pipe(catchError(this.donorErrorService.donateBloodErrorHandle));
  }

  updateStatus(data: { id: number; status: number }): any {
    return this.http.patch(`${this.BLOOD_DONATE_API}update_status/`, data);
  }

  updateRejectReason(data: { id: number; reject_reason: string }): any {
    return this.http
      .patch(`${this.BLOOD_DONATE_API}update_reason/`, data)
      .pipe(catchError(this.donorErrorService.rejectErrorHandle));
  }

  donateBloodHistoryDetail(id: number): Observable<{ result: DonateHistory }> {
    return this.http.get<{ result: DonateHistory }>(
      `${this.BLOOD_DONATE_HISTORY_API}${id}/`
    );
  }
}
