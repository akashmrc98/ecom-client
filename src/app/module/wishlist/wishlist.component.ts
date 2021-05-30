import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store'
import { Component, OnInit } from '@angular/core';

import { Product } from '@model/product.model';
import { CartService } from '@service/cart/cart.service';
import { WishlistService } from '@service/wishlist/wishlist.service';

import * as fromCartActions from '@store/cart/cart.actions'
import * as fromCartSelectors from '@store/cart/cart.selector'
import * as fromWishListActions from '@store/wishList/wishlist.actions'
import * as fromWishListSelectors from '@store/wishList/wishlist.selector'
import * as fromTaskBarSelectors from '@store/taskbar/taskbar.selector';
import * as fromTaskBarActions from '@store/taskbar/taskbar.actions';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  noOfProductsInWishList: number;
  noOfProductsInCart: number;

  products: Product[] = [];
  $products: Observable<Product[]>;
  isLoading: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private wishListService: WishlistService,
    private cartService: CartService,
    private taskBarStore: Store<fromTaskBarSelectors.TaskBarFeature>,
    private cartStore: Store<fromCartSelectors.CartFeature>,
    private wishListStore: Store<fromWishListSelectors.WishListFeature>
  ) { }

  getImage(product: Product) { return 'data:image/jpeg;base64,' + product.images[0].content }

  fromHttpServerGetProducts() {
    this.isLoading = true
    this.wishListService
      .getWishListProductsById()
      .subscribe(products => {
        this.wishListStore.dispatch(fromWishListActions.wishListProducts({ products: products }))
        this.fromStoreGetProducts()
        this.isLoading = false
      })
  }

  fromStoreGetProducts() {
    this.wishListStore
      .pipe(select(fromWishListSelectors.products))
      .subscribe(products => this.products = products)
  }

  isProductsLoaded(isLoaded: boolean) {
    if (isLoaded)
      this.fromStoreGetProducts()
    if (!isLoaded)
      this.fromHttpServerGetProducts()
  }

  ngOnInit(): void {
    this.wishListStore
      .pipe(select(fromWishListSelectors.isLoaded))
      .subscribe(isLoaded => this.isProductsLoaded(isLoaded))
  }

  getProduct(productId: number): Product {
    return this.products.find(products => products.id === productId)
  }

  removeProductFromWishList(productId: number, index: number) {
    this.wishListService
      .removeProductFromWishListByProductId(productId)
      .subscribe(() => {
        this.wishListStore.dispatch(fromWishListActions.removeProduct({ index: index }))
        this.updateCurrentNoOfProductsInWishList(-1)
        this._snackBar.open("Product removed from wishList!", 'close')
      })
  }

  moveToCart(productId: number, index: number) {
    this.cartService
      .addProductToCartByProductID(productId)
      .subscribe(() => {
        this.removeProductFromWishList(productId, index)
        this.updateCurrentNoOfProductsInCart(1)
        this.cartStore.dispatch(fromCartActions.addProduct({ product: this.getProduct(productId) }))
        this._snackBar.open("Product moved to cart!", 'close')
      })
  }

  updateCurrentNoOfProductsInCart(count: number) {
    let noOfProducts: number = 0;
    this.taskBarStore
      .pipe(select(fromTaskBarSelectors.noOfProductsInCart))
      .subscribe(_noOfProducts => noOfProducts = _noOfProducts)
    this.taskBarStore
      .dispatch(fromTaskBarActions.noOfProductsInCart({ noOfCartProducts: noOfProducts + count }))
  }

  updateCurrentNoOfProductsInWishList(count: number) {
    let noOfProducts: number = 0;
    this.taskBarStore
      .pipe(select(fromTaskBarSelectors.noOfProductsInWishList))
      .subscribe(_noOfProducts => noOfProducts = _noOfProducts)
    this.taskBarStore
      .dispatch(fromTaskBarActions.noOfProductsInWishList({ noOfWishListProducts: noOfProducts + count }))
  }

}
