import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NETWORK } from '../../config/http.config';

import { JwtResponse } from '../../model/domain/jwt.model';
import { AuthDTO } from '../../model/dto/auth.dto';

@Injectable({
  providedIn: 'any'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(authData: AuthDTO): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(NETWORK + "/login", authData)
  }

  logOut() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem("cartId")
    localStorage.removeItem("wishListId")
    localStorage.removeItem("id")
    localStorage.removeItem("username")
    window.location.reload()
  }
}
