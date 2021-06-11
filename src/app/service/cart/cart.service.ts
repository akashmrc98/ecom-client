import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { CART_API } from "../../config/http.config";
import { Product } from '@model/domain/product.model';
import { CartDTO } from '../../model/dto/cart.dto'
import { map } from 'rxjs/operators';
import { ProductList } from '@model/domain/ProductList.model';

@Injectable({
  providedIn: 'any'
})
export class CartService {
  constructor(private http: HttpClient) { }

  cartId: number = Number(localStorage.getItem("cartId"))

  // * http requests
  addProductToCartByProductID(productId: number) {
    const addItemToCart: CartDTO = { cartId: this.cartId, productId: productId }
    return this.http.post(CART_API + "/", addItemToCart)
  }

  getCartProductsByCartID(): Observable<ProductList[]> {
    return this.http.get<ProductList[]>(CART_API + "/" + this.cartId)
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

  calculateCartPrice(products: ProductList[], productQuantityList: number[]) {
    let price = 0;
    let pricesList: number[] = []
    products.map(product => pricesList.push(product.price))
    for (let i = 0; i < pricesList.length; i++)
      price += pricesList[i] * productQuantityList[i]
    return price
  }

  getProductIdList(products: ProductList[]) {
    let productIdList: number[] = []
    products.map(product => productIdList.push(product.id))
    return productIdList;
  }

  getProductsListQuantityList(totalProducts: number, productQuantityList: number[]) {
    if (productQuantityList.length === 0)
      for (let i = 0; i < totalProducts; i++)
        productQuantityList.push(1)
    return productQuantityList
  }

  getTotalProducts(productQuantityList: number[]) {
    let noOfProducts = 0;
    productQuantityList.map(currentProduct => { noOfProducts += currentProduct })
    return noOfProducts
  }

  addUnitQuantity(productQuantityList: number[], index: number, stock: number) {
    if (productQuantityList[index] < 4 && productQuantityList[index] < stock)
      productQuantityList[index] += 1;
    return productQuantityList
  }

  removeUnitQuantity(productQuantityList: number[], index: number) {
    if (productQuantityList[index] > 1)
      productQuantityList[index] -= 1;
    return productQuantityList
  }

}
