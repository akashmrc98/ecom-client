import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '@model/address.model';
import { Purchase, Purchases } from '@model/purchase.model';
import { User } from '@model/user.model';
import { USER_API } from 'config/http.config';

@Injectable({
  providedIn: 'any'
})
export class UserService {
  constructor(private http: HttpClient) { }

  username: string = localStorage.getItem("username")

  saveUser(user: User) {
    return this.http.post(USER_API, user)
  }

  saveAddressByUserName(address: Address[]) {
    return this.http.post(USER_API + this.username + "/address", address)
  }

  getPurchasesByUsername() {
    return this.http.get<Purchases[]>(USER_API + this.username + "/purchases")
  }

  getAddressByUserUsername() {
    return this.http.get<Address[]>(USER_API + this.username + "/address")
  }
}
