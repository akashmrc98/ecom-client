import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SESSION_API } from '../../config/http.config';

import { JwtResponse } from '../../model/domain/jwt.model';
import { AuthDTO } from '../../model/dto/auth.dto';

@Injectable({
  providedIn: 'any'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(authData: AuthDTO): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(SESSION_API + "/login", authData)
  }

  logOut() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
    localStorage.removeItem("id")
    window.location.reload()
  }
}
