import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase, Purchases } from '@model/purchase.model';
import { API } from 'config/http.config';

@Injectable({
  providedIn: 'any'
})
export class PurchaseService {
  constructor(private http: HttpClient) { }

  purchaseProductsFromCart(purchase: Purchase) {
    return this.http.post(API + "/purchases", purchase)
  }

}

