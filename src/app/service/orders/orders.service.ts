import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, ORDER_API } from 'config/http.config';
import { OrderDTO } from '@model/dto/order.dto';
import { ThrowStmt } from '@angular/compiler';

@Injectable({providedIn: 'any'})
export class OrderService {
  constructor(private http: HttpClient) { }

  userId:number = Number(localStorage.getItem('userId'))

  orderProductsFromCart(orders: OrderDTO) {
    return this.http.post(ORDER_API+`/${this.userId}`, orders)
  }

  getOrdersByUserId(){
    return this.http.get(ORDER_API+`/${this.userId}`)
  }

}

