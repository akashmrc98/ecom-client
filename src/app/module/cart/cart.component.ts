import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { PurchaseDTO } from '@model/dto/purchase.dto';

import { select, Store } from '@ngrx/store';
import * as fromCartActions from '@store/cart/cart.actions';
import * as fromCartSelectors from '@store/cart/cart.selector';

import { cartId, username } from 'config/http.config';
import { CommonService } from '@service/common/common.service';
import { CartService } from '@service/cart/cart.service';
import { ProductList } from '@model/domain/ProductList.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: ProductList[] = [];
  productQuantityList: number[] = [];

  price: number = 0;
  noOfProducts: number = 0;

  isLoading: boolean = false;

  constructor(
    private cartService: CartService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private cartStore: Store<fromCartSelectors.CartFeature>,
    private commonService: CommonService
  ) { }

  fromHttpServerGetProducts() {
    this.isLoading = true
    this.cartService
      .getCartProductsByCartID()
      .subscribe(products => {
        this.products = products
        this.cartStore.dispatch(fromCartActions.cartProducts({ products: products }))
        this.isLoading = false
      })
  }

  fromStoreGetProducts() {
    this.cartStore
      .pipe(select(fromCartSelectors.products))
      .subscribe(products => this.products = products)
    this.productQuantityList = this.cartService.getProductsListQuantityList(this.products.length, this.productQuantityList)
    this.noOfProducts = this.cartService.getTotalProducts(this.productQuantityList)
    this.price = this.cartService.calculateCartPrice(this.products, this.productQuantityList)
  }

  isProductsLoaded(isLoaded: boolean) {
    if (isLoaded)
      this.fromStoreGetProducts()
    if (!isLoaded)
      this.fromHttpServerGetProducts()
  }

  ngOnInit(): void {
    this.cartStore
      .pipe(select(fromCartSelectors.isLoaded))
      .subscribe(isLoaded => this.isProductsLoaded(isLoaded))
  }

  addQuantity(stock: number, index: number) {
    this.cartService.addUnitQuantity(this.productQuantityList, index, stock)
    this.noOfProducts = this.cartService.getTotalProducts(this.productQuantityList)
    this.price = this.cartService.calculateCartPrice(this.products, this.productQuantityList)
  }

  removeQuantity(index: number) {
    this.cartService.removeUnitQuantity(this.productQuantityList, index)
    this.noOfProducts = this.cartService.getTotalProducts(this.productQuantityList)
    this.price = this.cartService.calculateCartPrice(this.products, this.productQuantityList)
  }

  removeProductFromCart(productId: number, index: number) {
    this.cartService
      .removeProductFromCartByProductID(productId)
      .subscribe(() => {
        this.cartStore.dispatch(fromCartActions.removeProduct({ index: index }))
        this.commonService.updateCartBadge(-1)
        this.productQuantityList.splice(index, 1)
        this.noOfProducts = this.cartService.getTotalProducts(this.productQuantityList)
        this.price = this.cartService.calculateCartPrice(this.products, this.productQuantityList)
        this._snackBar.open("Product removed from cart!", 'close')
      })
  }

  checkOut() {
    const productIdList: number[] = this.cartService.getProductIdList(this.products)
    const purchase: PurchaseDTO = {
      cartId: cartId,
      username: username,
      totalProducts: this.noOfProducts,
      totalPrice: this.price,
      productsQuantityList: this.productQuantityList,
      productsIdList: productIdList,
      address: null,
      paymentMethod: ""
    }
    localStorage.setItem("purchase", JSON.stringify(purchase))
    this.cleanUp()
    this.router.navigate(['/', 'checkout', cartId])
  }

  cleanUp() {
    this.products = [];
    this.productQuantityList = [];
    this.price = 0;
    this.noOfProducts = 0;
    this.isLoading = true
  }

  goToProductPage(productId: number) {
    this.commonService.viewProductPage(productId)
  }

}
