import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonateBlood, DonateHistory, DonateHistoryView } from './donor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonorService {
  private readonly BLOOD_DONATE_HISTORY_API =
    'http://127.0.0.1:8000/auth/donate-blood-history/';
  private readonly BLOOD_DONATE_REQUEST_API =
    'http://127.0.0.1:8000/auth/donate-blood/';
  private readonly BLOOD_DONATE_API =
    'http://127.0.0.1:8000/auth/donate-blood/';
  private readonly BLOOD_STATUS_UPDATE =
    'http://127.0.0.1:8000/auth/donate-blood/update_status/';
  private readonly BLOOD_DONATE_REJECT_REASON_UPDATE =
    'http://127.0.0.1:8000/auth/donate-blood/update_reason/';

  constructor(private http: HttpClient) {}

  get_blood_donate_history(
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

  get_blood_donate_requests(): Observable<DonateHistory[]> {
    return this.http.get<DonateHistory[]>(`${this.BLOOD_DONATE_REQUEST_API}`);
  }

  donate_blood(data: DonateBlood): any {
    return this.http.post(`${this.BLOOD_DONATE_API}`, data);
  }

  update_status_donate_requests(data: { id: number; status: number }): any {
    return this.http.patch(`${this.BLOOD_STATUS_UPDATE}`, data);
  }

  update_reject_reason_requests(data: {
    id: number;
    reject_reason: string;
  }): any {
    return this.http.patch(`${this.BLOOD_DONATE_REJECT_REASON_UPDATE}`, data);
  }

  get_blood_donate_history_detail(
    id: number
  ): Observable<{ result: DonateHistory }> {
    return this.http.get<{ result: DonateHistory }>(
      `${this.BLOOD_DONATE_HISTORY_API}${id}/`
    );
  }
}
