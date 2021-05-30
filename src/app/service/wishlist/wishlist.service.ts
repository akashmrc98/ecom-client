import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddItemToWishList } from '@model/addItemToWishList';
import { Product } from '@model/product.model';
import { WISHLIST_API } from 'config/http.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class WishlistService {
  constructor(private http: HttpClient) { }

  wishListId: number = Number(localStorage.getItem("wishListId"))

  addProductToWishListByProductId(productId: number) {
    const addItemToWishList: AddItemToWishList = { wishListId: this.wishListId, productId: productId }
    return this.http.post(WISHLIST_API + "/", addItemToWishList)
  }

  getWishListProductsById(): Observable<Product[]> {
    return this.http.get<Product[]>(WISHLIST_API + "/" + this.wishListId)
  }

  getNoOfProductsInWishList(): Observable<number> {
    return this.getWishListProductsById().pipe(map(products => products.length))
  }

  removeProductFromWishListByProductId(productId: number) {
    const params = `?wishListId=${this.wishListId}&productId=${productId}`
    return this.http.delete(WISHLIST_API + params)
  }

}
