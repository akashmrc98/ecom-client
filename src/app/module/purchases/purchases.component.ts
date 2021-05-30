import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '@model/product.model';
import { Purchases } from '@model/purchase.model';
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

  getImage(product: Product) {
    return 'data:image/jpeg;base64,' + product.images[0].content
  }

  getPurchases() {
    this.isLoading = true
    this.userService.getPurchasesByUsername().subscribe(purchases => {
      this.purchases = purchases
      this.isLoading = false
    })
  }
}
