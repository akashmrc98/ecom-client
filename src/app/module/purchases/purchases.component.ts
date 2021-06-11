import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Purchases } from '@model/domain/purchase.model';
import { CommonService } from '@service/common/common.service';
import { UserService } from '@service/user/user.service';
import { ReviewCreatorComponent } from './dialogs/review-creator/review-creator.component';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {

  ngOnInit(): void {
    this.getPurchases()
  }

  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private dialog: MatDialog
  ) { }

  purchases: Purchases[] = [];
  isLoading: boolean = true;

  reviewProduct(productId: number) {
    const dialogRef = this.dialog.open(ReviewCreatorComponent, {
      width: '100%',
      data: { close: false, productId: productId }
    });
    dialogRef.afterClosed().subscribe();
  }

  getPurchases() {
    this.isLoading = true
    this.userService.getPurchasesByUsername().subscribe(purchases => {
      console.log(purchases)
      this.purchases = purchases
      this.isLoading = false
    })

  }

  goToProductPage(productId: number) {
    this.commonService.viewProductPage(productId)
  }
}
