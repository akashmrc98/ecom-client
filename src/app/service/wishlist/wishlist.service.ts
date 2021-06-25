import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WISHLIST_API } from 'config/http.config';
import { Observable } from 'rxjs';
import { ProductList } from '@model/domain/ProductList.model';

@Injectable({
  providedIn: 'any'
})
export class WishlistService {
  constructor(private http: HttpClient) { }

  userId: number = Number(localStorage.getItem("userId"))

  addProductToWishListByProductId(product: ProductList) {
    return this.http.post(WISHLIST_API + `/${this.userId}/products`, product)
  }

  getWishListProductsById(): Observable<ProductList[]> {
    return this.http.get<ProductList[]>(WISHLIST_API + "/" + 1)
  }

  getNoOfProductsInWishList(): Observable<number> {
    return this.http.get<number>(WISHLIST_API + `/${this.userId}/size`)
  }

  removeProductFromWishListByProductId(productId: number) {
    return this.http.delete(WISHLIST_API + `/${this.userId}/products/${productId}`)
  }

}
