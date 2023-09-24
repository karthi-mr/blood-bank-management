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
  private readonly CHECK_BLOOD_UNIT_AVAILABLE_API = 
        "http://127.0.0.1:8000/api/blood-stock/unit_available/";
  private readonly TOTAL_BLOOD_DONATE_COUNT = 
        "http://127.0.0.1:8000/auth/donate-blood/total_donate/";
  private readonly TOTAL_BLOOD_REQUEST_COUNT = 
        "http://127.0.0.1:8000/api/blood-request/total_request/";
  private readonly TOTAL_DONOR = 
        "http://127.0.0.1:8000/auth/donor/total_donor/";
  private readonly TOTAL_PATIENT = 
        "http://127.0.0.1:8000/auth/patient/total_patient/";

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

  unit_available(data: {blood_group: number, unit: number}): 
        Observable<{unit_available: boolean}> {
    return this.http.post<{unit_available: boolean}>
          (`${this.CHECK_BLOOD_UNIT_AVAILABLE_API}`, data);
  }

  add_blood_group(data: {blood_group: string}): any {
    return this.http.post(`${this.ADD_BLOOD_GROUP_API}`, data);
  }

  get_total_donate_blood(): Observable<{total_donate: number}> {
    return this.http.get<{total_donate: number}>(`${this.TOTAL_BLOOD_DONATE_COUNT}`);
  }
  
  get_total_request_blood(): Observable<{total_request: number}> {
    return this.http.get<{total_request: number}>(`${this.TOTAL_BLOOD_REQUEST_COUNT}`);
  }
  
  get_total_donor(): Observable<{total_donor: number}> {
    return this.http.get<{total_donor: number}>(`${this.TOTAL_DONOR}`);
  }
  
  get_total_patient(): Observable<{total_patient: number}> {
    return this.http.get<{total_patient: number}>(`${this.TOTAL_PATIENT}`);
  }
}
