import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '@model/product.model';

import { CartService } from '@service/cart/cart.service';
import { ProductService } from '@service/product/product.service';
import { WishlistService } from '@service/wishlist/wishlist.service';

import { select, Store } from '@ngrx/store';
import * as fromTaskBarActions from '@store/taskbar/taskbar.actions';
import * as fromTaskBarSelectors from '@store/taskbar/taskbar.selector'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private wishListService: WishlistService,
    private TaskBarStore: Store<fromTaskBarSelectors.TaskBarFeature>
  ) { }

  product: Product = {
    brand: "",
    category: "",
    description: "",
    images: [],
    manufacturedOn: null,
    price: 0,
    specifications: [],
    stock: 0,
    createdAt: null,
    id: 0,
    modifiedAt: null,
    subCategory: "",
    reviews: []
  };

  image: string = null;
  id: number = null;
  cartLength: number = 0;
  wishListLength: number = 0;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.isLoading = true
    this.route
      .params
      .subscribe(response => {
        this.id = response.productId
      })


    this.productService
      .getProduct(this.id)
      .subscribe(product => {
        this.product = product
        this.image = 'data:image/jpeg;base64,' + product.images[0].content
        this.isLoading = false
      })
  }



  getImage(id: number) {
    this.image = 'data:image/jpeg;base64,' + this.product.images[id].content
  }

  addToCart(productId: number): void {
    this.cartService
      .addProductToCartByProductID(productId)
      .subscribe(
        (next) => {
          this.updateCurrentNoOfProductsInCart(1)
          this._snackBar.open("Product Added to Cart!", 'close', { duration: 5000 })
        },
        (error) => {
          this._snackBar.open("Product Already in Cart!", 'close', { duration: 5000 })
        }
      )
  }

  addToWishList(productId: number): void {
    this.wishListService
      .addProductToWishListByProductId(productId)
      .subscribe(
        (next) => {
          this.updateCurrentNoOfProductsInWishList(1)
          this._snackBar.open("Product Added to WishList!", 'close', { duration: 5000 })
        },
        (error) => {
          this._snackBar.open("Product Already in WishList!", 'close', { duration: 5000 })
        }
      )
  }

  updateCurrentNoOfProductsInCart(count: number) {
    let noOfProducts: number = 0;
    this.TaskBarStore
      .pipe(select(fromTaskBarSelectors.noOfProductsInCart))
      .subscribe(_noOfProducts => noOfProducts = _noOfProducts)
    this.TaskBarStore
      .dispatch(fromTaskBarActions.noOfProductsInCart({ noOfCartProducts: noOfProducts + count }))
  }

  updateCurrentNoOfProductsInWishList(count: number) {
    let noOfProducts: number = 0;
    this.TaskBarStore
      .pipe(select(fromTaskBarSelectors.noOfProductsInWishList))
      .subscribe(_noOfProducts => noOfProducts = _noOfProducts)
    this.TaskBarStore
      .dispatch(fromTaskBarActions.noOfProductsInWishList({ noOfWishListProducts: noOfProducts + count }))
  }


}
