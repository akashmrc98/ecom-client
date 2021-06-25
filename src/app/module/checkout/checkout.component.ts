import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Address } from '@model/domain/address.model';
import { OrderDTO } from '@model/dto/order.dto';
import { Store } from '@ngrx/store';
import { OrderService } from '@service/orders/orders.service';
import { UserService } from '@service/user/user.service';
import { userId, username } from 'config/http.config';
import { AddressViewerComponent } from './dialogs/address-viewer/address-viewer.component';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';

import * as fromCartActions from '@store/cart/cart.actions'
import * as fromCartSelectors from '@store/cart/cart.selector'

import * as fromTaskBarActions from '@store/taskbar/taskbar.actions'
import * as fromTaskBarSelectors from '@store/taskbar/taskbar.selector'
import { CartService } from '@service/cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private orderService: OrderService,
    private userService: UserService,
    private cartStore: Store<fromCartSelectors.CartFeature>,
    private cartService: CartService,
    private taskBarStore: Store<fromTaskBarSelectors.TaskBarFeature>,
    public dialog: MatDialog,
  ) { }

  addresses: Address[];
  order: OrderDTO = JSON.parse(localStorage.getItem("order"));
  username: string = username
  paymentMethod: string;
  addressId: number;
  isLoading: boolean;

  getAddress() {
    this.isLoading = true
    this.userService
      .getAddressByUserUserId()
      .subscribe(address => this.addresses = this.isAddressAvailable(address))
  }

  isAddressAvailable(address: Address[]): Address[] {
    if (address.length === 0)
      this.router.navigate(['/', 'address-creator', this.username])
    this.isLoading = false
    return address
  }

  ngOnInit(): void {
    this.getAddress()
  }

  showAddressDialog(addressId: number) {
    const address: Address = this.addresses.find(address => address.id === addressId)
    const dialogRef = this.dialog.open(AddressViewerComponent, {
      width: '100%',
      data: { address: address, close: false, edit: true }
    });

    dialogRef.afterClosed().subscribe();
  }

  confirmDialog() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '100%',
      data: { close: false, checkout: true }
    });

    dialogRef.afterClosed().subscribe(isCheckOut => this.isCheckout(isCheckOut));
  }

  isCheckout(isCheckout: boolean) {
    if (isCheckout) this.checkOut()
  }

  checkOut() {
    this.isLoading = true
    const address: Address = this.addresses.find(address => address.id === this.addressId)
    let order: OrderDTO = { ...this.order };
    order.address = address;
    order.paymentMethod = this.paymentMethod
    this.orderService.orderProductsFromCart(order).subscribe((transactionDetails) => {
      console.log(transactionDetails)
      this.cartStore.dispatch(fromCartActions.clearCart())
      this.taskBarStore.dispatch(fromTaskBarActions.clearCart())
      this.cartService.clearCart().subscribe(res => res)
      localStorage.setItem("transactionDetails", JSON.stringify({
        price: order.totalPrice,
        payment: order.paymentMethod,
      }))
      localStorage.removeItem("order")
      this.router.navigate(['/payment', userId])
    })
  }

  ngOnDestroy() {
    this.isLoading = false
  }

}
