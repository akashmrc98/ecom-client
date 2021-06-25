import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { username } from 'config/http.config';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  username: string = username
  orders: any = {
    price: 0,
    payment:""
  };
  now:Date = new Date()

  isLoading: boolean = false
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true
    const isPurchaseData = JSON.parse(localStorage.getItem('transactionDetails'));
    if (isPurchaseData === null || isPurchaseData === undefined)
      this.router.navigate(['/', 'products'])

    if (isPurchaseData !== null && isPurchaseData !== undefined)
      this.orders = isPurchaseData
    this.isLoading = false

    console.log(this.orders)
    this.isLoading = false
  }

  ngOnDestroy() {
    localStorage.removeItem('transactionDetails')
    this.isLoading = false
  }

}
