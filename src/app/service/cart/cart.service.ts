import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { CART_API } from "../../config/http.config";
import { map } from 'rxjs/operators';
import { ProductList } from '@model/domain/ProductList.model';
import { Product } from '@model/domain/product.model';

@Injectable({
  providedIn: 'any'
})
export class CartService {
  constructor(private http: HttpClient) { }

  userId: number = Number(localStorage.getItem("userId"))

  // * http requests
  addProductToCartByProductID(product: ProductList) {
    return this.http.post(CART_API + `/${this.userId}/products`, product)
  }

  getCartProductsByCartID(): Observable<ProductList[]> {
    return this.http.get<ProductList[]>(CART_API + "/" + this.userId)
  }

  getNoOfProductsInCart(): Observable<number> {
    return this.http.get<any>(CART_API + `/${this.userId}/size`)
  }

  removeProductFromCartByProductID(productId: number) {
    return this.http.delete(CART_API + `/${this.userId}/products/${productId}`)
  }

  updateQuantity(productId: number, productQunatity: number) {
    return this.http.put(CART_API + `/${this.userId}/products/${productId}`, { productQuantity: productQunatity })
  }

  clearCart(){
    return this.http.delete(CART_API + `/${this.userId}/products`)
  }

  // * end of http requests

  // * Snippets
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

  getProductsListQuantityList(products: ProductList[]) {
    const productQuantityList: number[] = []
    products.map(product => productQuantityList.push(product.quantity))
    return productQuantityList
  }


  getTotalProducts(productQuantityList: number[]) {
    let noOfProducts = 0;
    productQuantityList.map(currentProduct => { noOfProducts += currentProduct })
    return noOfProducts
  }

  addUnitQuantity(productQuantityList: number[], productId: number, stock: number, index: number) {
    if (productQuantityList[index] < 4 && productQuantityList[index] < stock) {
      productQuantityList[index] += 1;
      this.updateQuantity(productId, productQuantityList[index]).subscribe(res => console.log(res))
    }
    return productQuantityList
  }

  removeUnitQuantity(productQuantityList: number[], productId: number, index: number) {
    console.log(productQuantityList[index])
    if (productQuantityList[index] > 1) {
      productQuantityList[index] -= 1;
      this.updateQuantity(productId, productQuantityList[index]).subscribe(res => console.log(res))
    }
    return productQuantityList
  }

}
