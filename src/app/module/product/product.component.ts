import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '@model/domain/product.model';

import { CartService } from '@service/cart/cart.service';
import { ProductService } from '@service/product/product.service';
import { WishlistService } from '@service/wishlist/wishlist.service';

import { CommonService } from '@service/common/common.service';

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
    private commonService: CommonService
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
          this.commonService.updateCartBadge(1)
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
          this.commonService.updateWishListBadge(1)
          this._snackBar.open("Product Added to WishList!", 'close', { duration: 5000 })
        },
        (error) => {
          this._snackBar.open("Product Already in WishList!", 'close', { duration: 5000 })
        }
      )
  }

}
