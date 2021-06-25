import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartComponent } from '@module/cart/cart.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent  {
   constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { close: boolean, save: boolean }) { }
}
