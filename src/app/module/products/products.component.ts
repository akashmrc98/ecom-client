import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '@service/cart/cart.service';
import { ProductService } from '@service/product/product.service';
import { WishlistService } from '@service/wishlist/wishlist.service';
import { Product } from '@model/product.model';
import { select, Store } from '@ngrx/store';
import * as fromTaskBarSelectors from '@store/taskbar/taskbar.selector';
import * as fromTaskBarActions from '@store/taskbar/taskbar.actions';

import * as fromCartStoreActions from '@store/cart/cart.actions'
import * as fromCartStoreSelectors from '@store/cart/cart.selector'

import * as fromWishListStoreActions from '@store/wishList/wishlist.actions'
import * as fromWishListSelectors from '@store/wishList/wishlist.selector'
import { Review } from '@model/domain/review.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private productService: ProductService,
    private cartService: CartService,
    private wishListService: WishlistService,
    private taskBarStore: Store<fromTaskBarSelectors.TaskBarFeature>,
    private cartStore: Store<fromCartStoreSelectors.CartFeature>,
    private wishListStore: Store<fromWishListSelectors.WishListFeature>
  ) { }

  products: Product[] = []

  isLoading: boolean = true;
  isAddedToCart: boolean = false

  getImage(product: Product) { return 'data:image/jpeg;base64,' + product.images[0].content }

  getProducts() {
    this.isLoading = true
    this.productService.getProducts().subscribe(products => {
      this.products = products
      this.isLoading = false
    })
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProduct(productId: number): Product {
    return this.products.find(product => product.id === productId)
  }

  getAverageRatings(reviews: Review[]): number {
    let averageRating: number = 0;
    reviews.forEach(review => averageRating += review.rating)
    averageRating /= reviews.length
    return averageRating
  }

  addToCart(productId: number): void {
    this.cartService.addProductToCartByProductID(productId).subscribe(
      (next) => {
        this.cartStore.dispatch(fromCartStoreActions.addProduct({ product: this.getProduct(productId) }))
        this.updateCurrentNoOfProductsInCart(1)
        this._snackBar.open("Product Added to Cart!", 'close', { duration: 5000 })
      },
      (error) => {
        this._snackBar.open("Product Already in Cart!", 'close', { duration: 5000 })
      })
  }

  addToWishList(productId: number): void {
    this.wishListService.addProductToWishListByProductId(productId).subscribe(
      (next) => {
        this.updateCurrentNoOfProductsInWishList(1)
        this.wishListStore.dispatch(fromWishListStoreActions.addProduct({ product: this.getProduct(productId) }))
        this._snackBar.open("Product Added to WishList!", 'close', { duration: 5000 })
      },
      (error) => {
        this._snackBar.open("Product Already in WishList!", 'close', { duration: 5000 })
      }
    )
  }

  viewProduct(id: number): void {
    this.router.navigate(['product', id.toString()])
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