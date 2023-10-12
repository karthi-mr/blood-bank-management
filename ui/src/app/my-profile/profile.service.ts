import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUser } from '../auth/auth.model';
import { MyProfile } from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly AUTH_API = 'http://127.0.0.1:8000/auth/';

  constructor(private http: HttpClient) {}

  myProfile(): Observable<MyProfile> {
    return this.http.get<MyProfile>(`${this.AUTH_API}my-profile/`);
  }

  /* update_user */
  updateUser(data: UpdateUser): any {
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
    } else if (data.user.user_type == 1) {
      return this.http.patch<{ message: string }>(
        `${this.AUTH_API}admin/${data.id}/`,
        data
      );
    }
  }
}
