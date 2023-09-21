import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonorResult, PatientResult } from './admin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly USER_API = "http://127.0.0.1:8000/auth/";

  constructor(private http: HttpClient) { }

  get_donor(link: string | null): Observable<DonorResult> {
    if(link) {
      return this.http.get<DonorResult>(`${link}`);
    }
    return this.http.get<DonorResult>(`${this.USER_API}donor/`);
  }
  
  get_patient(link: string | null): Observable<PatientResult> {
    if(link) {
      return this.http.get<PatientResult>(`${link}`);
    }
    return this.http.get<PatientResult>(`${this.USER_API}patient/`);
  }
}
