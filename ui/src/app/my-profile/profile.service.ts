import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyProfile } from './profile.model';
import { UpdateUser } from '../auth/auth.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly PROFILE_API = 'http://127.0.0.1:8000/auth/my-profile/';
  private AUTH_API = 'http://127.0.0.1:8000/auth/';

  constructor(private http: HttpClient) {}

  get_my_profile(): Observable<MyProfile> {
    return this.http.get<MyProfile>(`${this.PROFILE_API}`);
  }

  /* update_user */
  update_user(data: UpdateUser): any {
    if (data.user.user_type == 2) {
      return this.http.patch<{ message: string }>(
        `${this.AUTH_API}donor/${data.id}/`,
        data
      );
    } else if (data.user.user_type == 3) {
      return this.http.patch<{ message: string }>(
        `${this.AUTH_API}patient/${data.id}/`,
        data
      );
    }
  }
}
