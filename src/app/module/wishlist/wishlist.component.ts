import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store'
import { Component, OnInit } from '@angular/core';

import { CartService } from '@service/cart/cart.service';
import { WishlistService } from '@service/wishlist/wishlist.service';

import * as fromCartActions from '@store/cart/cart.actions'
import * as fromCartSelectors from '@store/cart/cart.selector'
import * as fromWishListActions from '@store/wishList/wishlist.actions'
import * as fromWishListSelectors from '@store/wishList/wishlist.selector'
import { CommonService } from '@service/common/common.service';
import { ProductList } from '@model/domain/ProductList.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  noOfProductsInWishList: number;
  noOfProductsInCart: number;

  products: ProductList[] = [];
  isLoading: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private wishListService: WishlistService,
    private cartService: CartService,
    private cartStore: Store<fromCartSelectors.CartFeature>,
    private wishListStore: Store<fromWishListSelectors.WishListFeature>,
    private commonService: CommonService
  ) { }

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

  removeProductFromWishList(productId: number, index: number) {
    this.wishListService
      .removeProductFromWishListByProductId(productId)
      .subscribe(() => {
        this.wishListStore.dispatch(fromWishListActions.removeProduct({ index: index }))
        this.commonService.updateWishListBadge(-1)
        this._snackBar.open("Product removed from wishList!", 'close')
      })
  }

  moveProductToCart(productId: number, index: number) {
    const product: ProductList = this.commonService.getProductById(productId, this.products)
    this.cartService
      .addProductToCartByProductID(product)
      .subscribe(() => {
        this.removeProductFromWishList(productId, index)
        this.commonService.updateCartBadge(1)
        this.cartStore.dispatch(fromCartActions.addProduct({ product: product }))
        this._snackBar.open("Product moved to cart!", 'close')
      })
  }

  goToProductPage(productId: number) {
    this.commonService.viewProductPage(productId)
  }

}
