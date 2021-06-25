import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '@model/domain/product.model';

import { CartService } from '@service/cart/cart.service';
import { ProductService } from '@service/product/product.service';
import { WishlistService } from '@service/wishlist/wishlist.service';

import { CommonService } from '@service/common/common.service';
import { ProductList } from '@model/domain/ProductList.model';
import { ReviewService } from '@service/review/review.service';
import { Review } from '@model/domain/review.model';

import * as fromCartStoreActions from '@store/cart/cart.actions'
import * as fromWishListStoreActions from '@store/wishList/wishlist.actions'

import * as fromCartStoreSelectors from '@store/cart/cart.selector'
import * as fromWishListSelectors from '@store/wishList/wishlist.selector'

import { Store } from '@ngrx/store';

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
    private reviewService: ReviewService,
    private commonService: CommonService,
    private cartStore: Store<fromCartStoreSelectors.CartFeature>,
    private wishListStore: Store<fromWishListSelectors.WishListFeature>
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
  reviews: Review[] = []

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

    this.reviewService.getReviewsByProductId(this.id)
      .subscribe(reviews => this.reviews = reviews)
  }

  getImage(id: number) {
    this.image = 'data:image/jpeg;base64,' + this.product.images[id].content
  }


  addToCart(productId): void {
    const product: ProductList = {
      brand: this.product.brand,
      description: this.product.description,
      id: this.product.id,
      image: this.product.images[0].content,
      price: this.product.price,
      ratings: 0,
      reviews: 0,
      stock: 0,
      quantity:1
    }
    this.cartService
      .addProductToCartByProductID(product)
      .subscribe(
        (next) => {
          this.cartStore.dispatch(fromCartStoreActions.addProduct({ product: product }))
          this.commonService.updateCartBadge(1)
          this._snackBar.open("Product Added to Cart!", 'close', { duration: 5000 })
        },
        (error) => {
          this._snackBar.open("Product Already in Cart!", 'close', { duration: 5000 })
        }
      )
  }

  addToWishList(productId: number): void {
    const product: ProductList = {
      brand: this.product.brand,
      description: this.product.description,
      id: this.product.id,
      image: this.product.images[0].content,
      price: this.product.price,
      stock: this.product.stock,
    }
    this.wishListService
      .addProductToWishListByProductId(product)
      .subscribe(
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
