import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WishListDTO } from '@model/dto/wishlist.dto';
import { WISHLIST_API } from 'config/http.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductList } from '@model/domain/ProductList.model';

@Injectable({
  providedIn: 'any'
})
export class WishlistService {
  constructor(private http: HttpClient) { }

  wishListId: number = Number(localStorage.getItem("wishListId"))

  addProductToWishListByProductId(productId: number) {
    const addItemToWishList: WishListDTO = { wishListId: this.wishListId, productId: productId }
    return this.http.post(WISHLIST_API + "/", addItemToWishList)
  }

  getWishListProductsById(): Observable<ProductList[]> {
    return this.http.get<ProductList[]>(WISHLIST_API + "/" + this.wishListId)
  }

  getNoOfProductsInWishList(): Observable<number> {
    return this.getWishListProductsById().pipe(map(products => products.length))
  }

  removeProductFromWishListByProductId(productId: number) {
    const params = `?wishListId=${this.wishListId}&productId=${productId}`
    return this.http.delete(WISHLIST_API + params)
  }

}
