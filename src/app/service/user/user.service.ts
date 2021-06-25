import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '@model/domain/address.model';
import { Orders } from '@model/domain/orders.model';
import { User } from '@model/domain/user.model';
import { USER_API } from 'config/http.config';

@Injectable({
  providedIn: 'any'
})
export class UserService {
  constructor(private http: HttpClient) { }

  userId: number =Number(localStorage.getItem("userId")) 

  saveUser(user: User) {
    return this.http.post(USER_API, user)
  }

  saveAddressByUserName(address: Address[]) {
    return this.http.post(USER_API + `/${this.userId}/address`, address)
  }

  getOrdersByUserId() {
    return this.http.get<Orders[]>(USER_API + `/${this.userId}/orders`)
  }

  getAddressByUserUserId() {
    return this.http.get<Address[]>(USER_API + `/${this.userId}/address`)
  }
}
