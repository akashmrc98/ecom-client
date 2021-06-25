import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Orders } from '@model/domain/orders.model';
import { CommonService } from '@service/common/common.service';
import { OrderService } from '@service/orders/orders.service';
import { UserService } from '@service/user/user.service';
import { ReviewCreatorComponent } from './dialogs/review-creator/review-creator.component';

@Component({
  selector: 'app-purchases',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  ngOnInit(): void {
    this.getPurchases()
  }

  constructor(
    private orderService: OrderService,
    private commonService: CommonService,
    private dialog: MatDialog
  ) { }

  purchases: any = [];
  isLoading: boolean = true;

  reviewProduct(productId: number, orderId:number, index:number) {
    const dialogRef = this.dialog.open(ReviewCreatorComponent, {
      width: '100%',
      data: { close: false, productId: productId, orderId:orderId, index:index }
    });
    dialogRef.afterClosed().subscribe();
  }

  getPurchases() {
    this.isLoading = true
    this.orderService.getOrdersByUserId().subscribe(purchases => {
      this.purchases = purchases
      this.isLoading = false
    })
  }

  goToProductPage(productId: number) {
    this.commonService.viewProductPage(productId)
  }
}
