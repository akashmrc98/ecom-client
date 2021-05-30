import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from '@model/address.model';
import { CheckoutComponent } from '@module/checkout/checkout.component';

@Component({
  selector: 'app-address-viewer',
  templateUrl: './address-viewer.component.html',
  styleUrls: ['./address-viewer.component.scss']
})
export class AddressViewerComponent {

  constructor(
    public dialogRef: MatDialogRef<CheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { address: Address, close: boolean, edit: boolean }) { }
}
