import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Purchase } from '@model/purchase.model';
import { Product } from '@model/product.model';
import { CartService } from '@service/cart/cart.service';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import * as fromTaskBarActions from '@store/taskbar/taskbar.actions';
import * as fromTaskBarSelectors from '@store/taskbar/taskbar.selector';

import * as fromCartActions from '@store/cart/cart.actions';
import * as fromCartSelectors from '@store/cart/cart.selector';

import { Observable, VirtualTimeScheduler } from 'rxjs';
import { cartId, username } from 'config/http.config';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  $products: Observable<Product[]>;
  products: Product[] = [];

  productQuantityList: number[] = [];
  productIdList: number[] = [];

  price: number = 0;
  noOfProducts: number = 0;

  isLoading: boolean = false;

  constructor(
    private cartService: CartService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private taskbar: Store<fromTaskBarSelectors.TaskBarFeature>,
    private cartStore: Store<fromCartSelectors.CartFeature>
  ) { }

  getImage(product: Product) {
    return 'data:image/jpeg;base64,' + product.images[0].content
  }

  initItemsList() {
    if (this.productQuantityList.length === 0)
      for (let i = 0; i < this.products.length; i++)
        this.productQuantityList.push(1)
  }

  updateItemsPrice() {
    let price = 0;
    let pricesList: number[] = []
    let productIdList: number[] = []
    this.products.map(product => {
      pricesList.push(product.price)
      productIdList.push(product.id)
    })
    for (let i = 0; i < pricesList.length; i++)
      price += pricesList[i] * this.productQuantityList[i]
    this.price = price;
    this.productIdList = productIdList;
  }

  updateTotalItems() {
    let noOfProducts = 0;
    this.productQuantityList.map(currentProduct => { noOfProducts += currentProduct })
    this.noOfProducts = noOfProducts
  }

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
    this.initItemsList()
    this.updateTotalItems()
    this.updateItemsPrice()
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
    if (this.productQuantityList[index] < 4 && this.productQuantityList[index] < stock)
      this.productQuantityList[index] += 1;
    this.updateTotalItems()
    this.updateItemsPrice()
  }

  removeQuantity(index: number) {
    if (this.productQuantityList[index] > 1)
      this.productQuantityList[index] -= 1;
    this.updateTotalItems()
    this.updateItemsPrice()
  }


  removeProductFromCart(productId: number, index: number) {
    this.cartService
      .removeProductFromCartByProductID(productId)
      .subscribe(() => {
        this.cartStore.dispatch(fromCartActions.removeProduct({ index: index }))
        this.updateCurrentNoOfProductsInCart(-1)
        this.productQuantityList.splice(index, 1)
        this.updateTotalItems()
        this.updateItemsPrice()
        this._snackBar.open("Product removed from cart!", 'close')
      })
  }

  checkOut() {
    const purchase: Purchase = {
      cartId: cartId,
      username: username,
      totalProducts: this.noOfProducts,
      totalPrice: this.price,
      products: this.products,
      productsQuantityList: this.productQuantityList,
      productsIdList: this.productIdList,
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
    this.productIdList = [];
    this.price = 0;
    this.noOfProducts = 0;
    this.isLoading = true
  }

  updateCurrentNoOfProductsInCart(count: number) {
    let noOfProducts: number = 0;
    this.taskbar
      .pipe(select(fromTaskBarSelectors.noOfProductsInCart))
      .subscribe(_noOfProducts => noOfProducts = _noOfProducts)
    this.taskbar
      .dispatch(fromTaskBarActions.noOfProductsInCart({ noOfCartProducts: noOfProducts + count }))
  }

}
