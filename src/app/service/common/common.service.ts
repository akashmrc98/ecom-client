import { Injectable } from '@angular/core';
import { Review } from '@model/domain/review.model';

import { select, Store } from '@ngrx/store'
import { Product } from '@model/domain/product.model';

import * as fromTaskBarSelectors from '@store/taskbar/taskbar.selector';
import * as fromTaskBarActions from '@store/taskbar/taskbar.actions';
import { Router } from '@angular/router';
import { ProductList } from '@model/domain/ProductList.model';

@Injectable({ providedIn: 'any' })
export class CommonService {

  constructor(
    private taskBarStore: Store<fromTaskBarSelectors.TaskBarFeature>,
    private router: Router
  ) { }

  getProductById(ProductId: number, products: ProductList[]): ProductList {
    return products.find(product => product.id === ProductId)
  }

  getAverageRatings(reviews: Review[]): number {
    let averageRating: number = 0;
    reviews.forEach(review => averageRating += review.rating)
    averageRating /= reviews.length
    return averageRating
  }

  updateCartBadge(count: number) {
    let noOfProducts: number = 0;
    this.taskBarStore
      .pipe(select(fromTaskBarSelectors.noOfProductsInCart))
      .subscribe(_noOfProducts => noOfProducts = _noOfProducts)
    this.taskBarStore
      .dispatch(fromTaskBarActions.noOfProductsInCart({ noOfCartProducts: noOfProducts + count }))
  }

  updateWishListBadge(count: number) {
    let noOfProducts: number = 0;
    this.taskBarStore
      .pipe(select(fromTaskBarSelectors.noOfProductsInWishList))
      .subscribe(_noOfProducts => noOfProducts = _noOfProducts)
    this.taskBarStore
      .dispatch(fromTaskBarActions.noOfProductsInWishList({ noOfWishListProducts: noOfProducts + count }))
  }

  viewProductPage(productId: number) {
    this.router.navigate(['/', 'product', productId])
  }

}
