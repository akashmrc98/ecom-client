import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { CART_API } from "../../config/http.config";
import { Product } from '@model/product.model';
import { AddItemToCart } from '../../model/addItemToCart'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class CartService {
  constructor(private http: HttpClient) { }

  cartId: number = Number(localStorage.getItem("cartId"))

  // * http requests
  addProductToCartByProductID(productId: number) {
    const addItemToCart: AddItemToCart = { cartId: this.cartId, productId: productId }
    return this.http.post(CART_API + "/", addItemToCart)
  }

  getCartProductsByCartID(): Observable<Product[]> {
    return this.http.get<Product[]>(CART_API + "/" + this.cartId)
  }

  getNoOfProductsInCart(): Observable<number> {
    return this.getCartProductsByCartID().pipe(map(products => products.length))
  }

  removeProductFromCartByProductID(productId: number) {
    const params: HttpParams = new HttpParams()
      .set("cartId", this.cartId.toString())
      .set("productId", productId.toString())
    return this.http.delete(CART_API, { params })
  }
  // * observables, piping and transformation of streams

}
