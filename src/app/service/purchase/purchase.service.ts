import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'config/http.config';
import { PurchaseDTO } from '@model/dto/purchase.dto';

@Injectable({
  providedIn: 'any'
})
export class PurchaseService {
  constructor(private http: HttpClient) { }

  purchaseProductsFromCart(purchase: PurchaseDTO) {
    return this.http.post(API + "/purchases", purchase)
  }

}

