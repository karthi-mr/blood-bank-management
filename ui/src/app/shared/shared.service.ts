import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { BloodGroup, Branch } from './shared.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private readonly BLOOD_GROUP_API = 'http://127.0.0.1:8000/api/blood-group/';
  private readonly BRANCH_API = 'http://127.0.0.1:8000/api/branch/';
  private readonly TABS_API = 'http://127.0.0.1:8000/auth/tab/';

  blood_groups: Subject<BloodGroup[]> = new Subject<BloodGroup[]>();
  branches: Branch[] = [];
  blood_groups_array: BloodGroup[] = [];

  constructor(private http: HttpClient) {}

  calculateTotalPage(data: number): number {
    let page = parseInt(String(data / 50));
    if (data % 50 != 0) {
      page += 1;
    }
    return page;
  }

  bloodGroupList(): Observable<BloodGroup[]> {
    return this.http.get<BloodGroup[]>(`${this.BLOOD_GROUP_API}`).pipe(
      tap((data: BloodGroup[]) => {
        this.blood_groups.next(data);
        this.blood_groups_array = data;
      })
    );
  }

  branchList(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.BRANCH_API}`).pipe(
      tap((data: Branch[]) => {
        this.branches = data;
      })
    );
  }

  branchDetail(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.BRANCH_API}${id}/`);
  }

  tabsList(): any {
    return this.http.get(`${this.TABS_API}`);
  }
}
