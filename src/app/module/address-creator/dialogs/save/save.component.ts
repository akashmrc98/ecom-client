import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressCreatorComponent } from '@module/address-creator/address-creator.component';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent {
  constructor(
    public dialogRef: MatDialogRef<AddressCreatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { close: boolean, save: boolean }) { }
}
