import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Admin,
  AdminResult,
  BloodStock,
  Donor,
  DonorResult,
  Patient,
  PatientResult,
} from './admin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly USER_API = 'http://127.0.0.1:8000/auth/';
  private readonly BLOOD_STOCK_API = 'http://127.0.0.1:8000/api/blood-stock/';
  private readonly ADD_BLOOD_GROUP_API =
    'http://127.0.0.1:8000/api/blood-group/';
  private readonly BLOOD_DONATE_COUNT =
    'http://127.0.0.1:8000/api/donate-blood/';
  private readonly BLOOD_REQUEST_COUNT =
    'http://127.0.0.1:8000/api/blood-request/';
  private readonly TOTAL_DONOR =
    'http://127.0.0.1:8000/auth/donor/total_donor/';
  private readonly TOTAL_PATIENT =
    'http://127.0.0.1:8000/auth/patient/total_patient/';

  constructor(private http: HttpClient) {}

  get_donor(
    link: string | null,
    order: string | null
  ): Observable<DonorResult> {
    if (link) {
      return this.http.get<DonorResult>(`${link}`);
    }
    return this.http.get<DonorResult>(`${this.USER_API}donor/?${order}`);
  }

  get_admin(
    link: string | null,
    order: string | null
  ): Observable<AdminResult> {
    if (link) {
      return this.http.get<AdminResult>(`${link}`);
    }
    return this.http.get<AdminResult>(`${this.USER_API}admin/?${order}`);
  }

  get_patient(
    link: string | null,
    order: string | null
  ): Observable<PatientResult> {
    if (link) {
      return this.http.get<PatientResult>(`${link}`);
    }
    return this.http.get<PatientResult>(`${this.USER_API}patient/?${order}`);
  }

  get_stock(): Observable<BloodStock[]> {
    return this.http.get<BloodStock[]>(`${this.BLOOD_STOCK_API}`);
  }

  update_stock(data: { blood_group: number; unit: number }): any {
    return this.http.patch(`${this.BLOOD_STOCK_API}update_stock/`, data);
  }

  unit_available(data: {
    blood_group: number;
    unit: number;
  }): Observable<{ unit_available: boolean }> {
    return this.http.post<{ unit_available: boolean }>(
      `${this.BLOOD_STOCK_API}unit_available/`,
      data
    );
  }

  add_blood_group(data: { blood_group: string }): any {
    return this.http.post(`${this.ADD_BLOOD_GROUP_API}`, data);
  }

  get_total_donor(): Observable<{ total_donor: number }> {
    return this.http.get<{ total_donor: number }>(`${this.TOTAL_DONOR}`);
  }

  get_total_patient(): Observable<{ total_patient: number }> {
    return this.http.get<{ total_patient: number }>(`${this.TOTAL_PATIENT}`);
  }

  get_total_donate_blood(): Observable<{ total_donate: number }> {
    return this.http.get<{ total_donate: number }>(
      `${this.BLOOD_DONATE_COUNT}total_donate/`
    );
  }

  get_total_donate_blood_approved(): Observable<{ total_donate: number }> {
    return this.http.get<{ total_donate: number }>(
      `${this.BLOOD_DONATE_COUNT}total_donate_approved/`
    );
  }

  get_total_donate_blood_pending(): Observable<{ total_donate: number }> {
    return this.http.get<{ total_donate: number }>(
      `${this.BLOOD_DONATE_COUNT}total_donate_pending/`
    );
  }

  get_total_donate_blood_rejected(): Observable<{ total_donate: number }> {
    return this.http.get<{ total_donate: number }>(
      `${this.BLOOD_DONATE_COUNT}total_donate_rejected/`
    );
  }

  get_total_request_blood(): Observable<{ total_request: number }> {
    return this.http.get<{ total_request: number }>(
      `${this.BLOOD_REQUEST_COUNT}total_request/`
    );
  }

  get_total_request_blood_approved(): Observable<{ total_request: number }> {
    return this.http.get<{ total_request: number }>(
      `${this.BLOOD_REQUEST_COUNT}total_request_approved/`
    );
  }

  get_total_request_blood_pending(): Observable<{ total_request: number }> {
    return this.http.get<{ total_request: number }>(
      `${this.BLOOD_REQUEST_COUNT}total_request_pending/`
    );
  }

  get_total_request_blood_rejected(): Observable<{ total_request: number }> {
    return this.http.get<{ total_request: number }>(
      `${this.BLOOD_REQUEST_COUNT}total_request_rejected/`
    );
  }

  get_admin_detail(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.USER_API}admin/${id}`);
  }

  get_donor_detail(id: number): Observable<Donor> {
    return this.http.get<Donor>(`${this.USER_API}donor/${id}`);
  }

  get_patient_detail(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.USER_API}patient/${id}`);
  }

  add_admin(data: Admin): any {
    return this.http.post(`${this.USER_API}admin/`, data);
  }
}
