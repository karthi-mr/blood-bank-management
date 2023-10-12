import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { AdminErrorService } from './admin-error.service';
import {
  Admin,
  AdminResult,
  BloodStock,
  Donor,
  DonorResult,
  Patient,
  PatientResult,
} from './admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly AUTH_API = 'http://127.0.0.1:8000/auth/';
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

  constructor(
    private http: HttpClient,
    private adminErrorService: AdminErrorService
  ) {}

  getDonorList(
    link: string | null,
    order: string | null
  ): Observable<DonorResult> {
    if (link) {
      return this.http
        .get<DonorResult>(`${link}`)
        .pipe(catchError(this.adminErrorService.commonErrorHandle));
    }
    return this.http
      .get<DonorResult>(`${this.AUTH_API}donor/?${order}`)
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  getAdminList(
    link: string | null,
    order: string | null
  ): Observable<AdminResult> {
    if (link) {
      return this.http
        .get<AdminResult>(`${link}`)
        .pipe(catchError(this.adminErrorService.commonErrorHandle));
    }
    return this.http
      .get<AdminResult>(`${this.AUTH_API}admin/?${order}`)
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  getPatientList(
    link: string | null,
    order: string | null
  ): Observable<PatientResult> {
    if (link) {
      return this.http
        .get<PatientResult>(`${link}`)
        .pipe(catchError(this.adminErrorService.commonErrorHandle));
    }
    return this.http
      .get<PatientResult>(`${this.AUTH_API}patient/?${order}`)
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  getStockDetail(): Observable<BloodStock[]> {
    return this.http
      .get<BloodStock[]>(`${this.BLOOD_STOCK_API}`)
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  updateStock(data: { blood_group: number; unit: number }): any {
    return this.http.patch(`${this.BLOOD_STOCK_API}update_stock/`, data);
  }

  unitAvailableCheck(data: {
    blood_group: number;
    unit: number;
  }): Observable<{ unit_available: boolean }> {
    return this.http.post<{ unit_available: boolean }>(
      `${this.BLOOD_STOCK_API}unit_available/`,
      data
    );
  }

  addBloodGroup(data: { blood_group: string }): any {
    return this.http.post(`${this.ADD_BLOOD_GROUP_API}`, data);
  }

  totalDonor(): Observable<{ total_donor: number }> {
    return this.http
      .get<{ total_donor: number }>(`${this.TOTAL_DONOR}`)
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  totalPatient(): Observable<{ total_patient: number }> {
    return this.http
      .get<{ total_patient: number }>(`${this.TOTAL_PATIENT}`)
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  totalDonateBlood(): Observable<{ total_donate: number }> {
    return this.http
      .get<{ total_donate: number }>(`${this.BLOOD_DONATE_COUNT}total_donate/`)
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  totalDonateBloodApproved(): Observable<{ total_donate: number }> {
    return this.http
      .get<{ total_donate: number }>(
        `${this.BLOOD_DONATE_COUNT}total_donate_approved/`
      )
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  totalDonateBloodPending(): Observable<{ total_donate: number }> {
    return this.http
      .get<{ total_donate: number }>(
        `${this.BLOOD_DONATE_COUNT}total_donate_pending/`
      )
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  totalDonateBloodRejected(): Observable<{ total_donate: number }> {
    return this.http
      .get<{ total_donate: number }>(
        `${this.BLOOD_DONATE_COUNT}total_donate_rejected/`
      )
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  totalRequestBlood(): Observable<{ total_request: number }> {
    return this.http
      .get<{ total_request: number }>(
        `${this.BLOOD_REQUEST_COUNT}total_request/`
      )
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  totalRequestBloodApproved(): Observable<{ total_request: number }> {
    return this.http
      .get<{ total_request: number }>(
        `${this.BLOOD_REQUEST_COUNT}total_request_approved/`
      )
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  totalRequestBloodPending(): Observable<{ total_request: number }> {
    return this.http
      .get<{ total_request: number }>(
        `${this.BLOOD_REQUEST_COUNT}total_request_pending/`
      )
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  totalRequestBloodRejected(): Observable<{ total_request: number }> {
    return this.http
      .get<{ total_request: number }>(
        `${this.BLOOD_REQUEST_COUNT}total_request_rejected/`
      )
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  adminDetail(id: number): Observable<Admin> {
    return this.http
      .get<Admin>(`${this.AUTH_API}admin/${id}`)
      .pipe(catchError(this.adminErrorService.commonErrorHandle));
  }

  donorDetail(id: number): Observable<Donor> {
    return this.http.get<Donor>(`${this.AUTH_API}donor/${id}`);
  }

  patientDetail(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.AUTH_API}patient/${id}`);
  }

  addAdmin(data: Admin): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${this.AUTH_API}admin/`, data)
      .pipe(catchError(this.adminErrorService.addAdminErrorHandle));
  }
}
