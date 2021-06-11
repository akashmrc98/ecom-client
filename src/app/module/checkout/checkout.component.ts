import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Address } from '@model/domain/address.model';
import { PurchaseDTO } from '@model/dto/purchase.dto';
import { Store } from '@ngrx/store';
import { PurchaseService } from '@service/purchase/purchase.service';
import { UserService } from '@service/user/user.service';
import { cartId, username } from 'config/http.config';
import { AddressViewerComponent } from './dialogs/address-viewer/address-viewer.component';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';

import * as fromCartActions from '@store/cart/cart.actions'
import * as fromCartSelectors from '@store/cart/cart.selector'

import * as fromTaskBarActions from '@store/taskbar/taskbar.actions'
import * as fromTaskBarSelectors from '@store/taskbar/taskbar.selector'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private purchaseService: PurchaseService,
    private userService: UserService,
    private cartStore: Store<fromCartSelectors.CartFeature>,
    private taskBarStore: Store<fromTaskBarSelectors.TaskBarFeature>,
    public dialog: MatDialog,
  ) { }

  addresses: Address[];
  purchase: PurchaseDTO = JSON.parse(localStorage.getItem("purchase"));
  cartId: number = cartId
  username: string = username
  paymentMethod: string;
  addressId: number;
  isLoading: boolean;

  getAddress() {
    this.isLoading = true
    this.userService
      .getAddressByUserUsername()
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
    let purchase: PurchaseDTO = { ...this.purchase };
    purchase.address = address;
    purchase.paymentMethod = this.paymentMethod
    this.purchaseService.purchaseProductsFromCart(purchase).subscribe((transactionDetails) => {
      this.cartStore.dispatch(fromCartActions.clearCart())
      this.taskBarStore.dispatch(fromTaskBarActions.clearCart())
      localStorage.setItem("transactionDetails", JSON.stringify(transactionDetails))
      localStorage.removeItem("purchase")
      this.router.navigate(['/payment', cartId])
    })
  }

  ngOnDestroy() {
    this.isLoading = false
  }

}
