import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BloodGroup } from './shared.model';
import { Observable, Subject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private readonly BLOOD_GROUP_API = "http://127.0.0.1:8000/api/blood-group/";
  blood_groups: Subject<BloodGroup[]> = new Subject<BloodGroup[]>

  constructor(private http: HttpClient) { }

  get_blood_group(): Observable<BloodGroup[]> {
    return this.http.get<BloodGroup[]>(`${this.BLOOD_GROUP_API}`).pipe(
      tap((data: BloodGroup[]) => {
        this.blood_groups.next(data);
      })
    );
  }
}
