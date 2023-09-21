import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonateHistory } from './donor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  private readonly BLOOD_DONATE_HISTORY = 
        "http://127.0.0.1:8000/auth/donate-blood-history/";

  constructor(private http: HttpClient) { }

  get_blood_donate_history(): Observable<DonateHistory[]> {
    return this.http.get<DonateHistory[]>(`${this.BLOOD_DONATE_HISTORY}`);
  }
}
