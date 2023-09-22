import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BloodStock, DonorResult, PatientResult } from './admin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly USER_API = "http://127.0.0.1:8000/auth/";
  private readonly BLOOD_STOCK_API = "http://127.0.0.1:8000/api/blood-stock/";
  private readonly UPDATE_BLOOD_STOCK_API = 
        "http://127.0.0.1:8000/api/blood-stock/update_stock/";
  private readonly ADD_BLOOD_GROUP_API = "http://127.0.0.1:8000/api/blood-group/";

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

  get_stock(): Observable<BloodStock[]> {
    return this.http.get<BloodStock[]>(`${this.BLOOD_STOCK_API}`);
  }

  update_stock(data: {blood_group: number, unit: number}): any {
    return this.http.patch(`${this.UPDATE_BLOOD_STOCK_API}`, data);
  }

  add_blood_group(data: {blood_group: string}): any {
    return this.http.post(`${this.ADD_BLOOD_GROUP_API}`, data);
  }
}
