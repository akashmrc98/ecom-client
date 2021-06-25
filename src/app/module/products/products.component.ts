import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CartService } from '@service/cart/cart.service';
import { ProductService } from '@service/product/product.service';
import { WishlistService } from '@service/wishlist/wishlist.service';

import { select, Store } from '@ngrx/store';

import * as fromCartStoreActions from '@store/cart/cart.actions'
import * as fromCartStoreSelectors from '@store/cart/cart.selector'

import * as fromWishListStoreActions from '@store/wishList/wishlist.actions'
import * as fromWishListSelectors from '@store/wishList/wishlist.selector'

import * as fromProductActions from '@store/product/product.actions'
import * as fromProductSelectors from '@store/product/product.selector'

import { CommonService } from '@service/common/common.service';
import { ProductList } from '@model/domain/ProductList.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private productService: ProductService,
    private cartService: CartService,
    private wishListService: WishlistService,
    private cartStore: Store<fromCartStoreSelectors.CartFeature>,
    private wishListStore: Store<fromWishListSelectors.WishListFeature>,
    private commonService: CommonService,
    private productStore: Store<fromProductSelectors.ProductFeature>,
  ) { }

  products: ProductList[] = []

  isLoading: boolean = true;
  isAddedToCart: boolean = false

  goToProductPage(productId: number) {
    this.commonService.viewProductPage(productId)
  }

  getProducts() {
    this.isLoading = true
    this.productService.getProducts(0, 4, "").subscribe(products => {
      this.productStore.dispatch(fromProductActions.products({ products: products }))
      this.products = products
      this.isLoading = false
    })
  }

  ngOnInit(): void {
    this.productStore.pipe(select(fromProductSelectors.isLoaded)).subscribe(isLoaded => this.isProductsLoaded(isLoaded))
  }

  isProductsLoaded(isLoaded: boolean) {
    if (isLoaded)
      this.productStore.pipe(select(fromProductSelectors.products)).subscribe(products => this.products = products)
    if (!isLoaded)
      this.getProducts()
    this.isLoading = false
  }


  addProductToCart(productId: number): void {
    let product: ProductList = this.commonService.getProductById(productId, this.products)
    product = {
      ...product,
      quantity: 1
    }
    this.cartService.addProductToCartByProductID(product).subscribe(
      (next) => {
        this.cartStore.dispatch(fromCartStoreActions.addProduct({ product: product }))
        this.commonService.updateCartBadge(1)
        this._snackBar.open("Product Added to Cart!", 'close', { duration: 5000 })
      },
      (error) => {
        console.log(error)
        this._snackBar.open("Product Already in Cart!", 'close', { duration: 5000 })
      })
  }

  addProductToWishList(productId: number): void {
    let product: ProductList = this.commonService.getProductById(productId, this.products)
    product = {
      ...product,
      quantity: 1
    }
    this.wishListService.addProductToWishListByProductId(product).subscribe(
      (next) => {
        this.wishListStore.dispatch(fromWishListStoreActions.addProduct({ product: product }))
        this.commonService.updateWishListBadge(1)
        this._snackBar.open("Product Added to WishList!", 'close', { duration: 5000 })
      },
      (error) => {
        this._snackBar.open("Product Already in WishList!", 'close', { duration: 5000 })
      }
    )
  }
}