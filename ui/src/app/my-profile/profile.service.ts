import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyProfile } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly PROFILE_API = "http://127.0.0.1:8000/auth/my-profile/";

  constructor(private http: HttpClient) { }

  get_my_profile(): Observable<MyProfile>{
    return this.http.get<MyProfile>(`${this.PROFILE_API}`);
  }
}
