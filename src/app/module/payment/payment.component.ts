import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Purchases } from '@model/domain/purchase.model';
import { username } from 'config/http.config';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  username: string = username
  purchase: Purchases = {
    address: null,
    id: null,
    paymentMethod: "",
    products: null,
    productsQuantityList: null,
    purchasedAt: new Date(),
    totalPrice: 0,
    totalProducts: 0
  };

  isLoading: boolean = false
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true
    const isPurchaseData = JSON.parse(localStorage.getItem('transactionDetails'));
    if (isPurchaseData === null || isPurchaseData === undefined)
      this.router.navigate(['/', 'products'])

    if (isPurchaseData !== null && isPurchaseData !== undefined)
      this.purchase = isPurchaseData
    this.isLoading = false

    console.log(this.purchase)
  }

  ngOnDestroy() {
    localStorage.removeItem('transactionDetails')
    this.isLoading = false
  }

}
