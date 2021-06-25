import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CartService } from '@service/cart/cart.service';
import { AuthService } from '@service/auth/auth.service';
import { WishlistService } from '@service/wishlist/wishlist.service';
import { username, userId } from 'config/http.config';

import { select, Store } from '@ngrx/store';
import { TaskBarFeature, noOfProductsInCart, noOfProductsInWishList, noOfProductsInCartUpdated, noOfProductsInWishListUpdated } from '@store/taskbar/taskbar.selector';
import * as fromTaskBarActions from '@store/taskbar/taskbar.actions';


@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})
export class TaskbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private wishListService: WishlistService,
    private TaskBarStore: Store<TaskBarFeature>
  ) { }

  myControl = new FormControl();

  username: string = username
  userId: number = userId

  options: string[] = [];
  showNav: boolean = false;
  navAnimation: string = "";

  noOfProductsInCart: number;
  noOfProductsInWishList: number;


  toggleNavigation() {
    if (this.showNav)
      this.navAnimation = "animate__fadeOutLeft"
    if (!this.showNav)
      this.navAnimation = "animate__fadeInLeft"
    if (this.showNav)
      setTimeout(() => { this.showNav = !this.showNav }, 250)
    if (!this.showNav)
      this.showNav = !this.showNav
  }

  dispatchNoProductsInCartToStore(noOfProducts: number) {
    this.TaskBarStore.dispatch(fromTaskBarActions.noOfProductsInCart({ noOfCartProducts: noOfProducts }))
  }

  fromHttpServerNoOfProductsInCart() {
    this.cartService
      .getNoOfProductsInCart()
      .subscribe(noOfProducts => this.dispatchNoProductsInCartToStore(noOfProducts))
  }

  fromStoreNoOfProductsInCart() {
    this.TaskBarStore
      .pipe(select(noOfProductsInCart))
      .subscribe(noOfProducts => this.noOfProductsInCart = noOfProducts)
  }

  dispatchNoProductsInWishListToStore(noOfProducts: number) {
    this.TaskBarStore.dispatch(fromTaskBarActions.noOfProductsInWishList({ noOfWishListProducts: noOfProducts }))
  }

  fromHttpServerNoOfProductsInWishList() {
    this.wishListService
      .getNoOfProductsInWishList()
      .subscribe(noOfProducts => this.dispatchNoProductsInWishListToStore(noOfProducts))
  }

  fromStoreNoOfProductsInWishList() {
    this.TaskBarStore
      .pipe(select(noOfProductsInWishList))
      .subscribe(noOfProducts => this.noOfProductsInWishList = noOfProducts)
  }

  isInitialFetchCartProducts(isUpdated: boolean) {
    if (isUpdated)
      this.fromStoreNoOfProductsInCart()
    if (!isUpdated)
      this.fromHttpServerNoOfProductsInCart()
  }

  isInitialFetchWishListProducts(isUpdated: boolean) {
    if (isUpdated)
      this.fromStoreNoOfProductsInWishList()
    if (!isUpdated)
      this.fromHttpServerNoOfProductsInWishList()
  }

  ngOnInit(): void {
    this.TaskBarStore.pipe(select(noOfProductsInCartUpdated)).subscribe(isUpdated => this.isInitialFetchCartProducts(isUpdated))
    this.TaskBarStore.pipe(select(noOfProductsInWishListUpdated)).subscribe(isUpdated => this.isInitialFetchWishListProducts(isUpdated))
  }

  logOut() { this.authService.logOut() }

}
