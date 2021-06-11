import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '@service/user/user.service';
import { username } from 'config/http.config';
import { SaveComponent } from './dialogs/save/save.component';

@Component({
  selector: 'app-address-creator',
  templateUrl: './address-creator.component.html',
  styleUrls: ['./address-creator.component.scss']
})
export class AddressCreatorComponent {

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ) { }

  username: string = username

  addressForm: FormGroup = new FormGroup({
    fullName: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    addressType: new FormControl(null, [Validators.required]),
    firstLine: new FormControl(null, [Validators.required]),
    secondLine: new FormControl(null, [Validators.required]),
    zip: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
  })

  confirmDialog() {
    const dialogRef = this.dialog.open(SaveComponent, {
      width: '100%',
      data: { close: false, save: true }
    });
    dialogRef.afterClosed().subscribe(isCheckOut => this.canSaveAddress(isCheckOut));
  }

  canSaveAddress(save: boolean) {
    if (save)
      this.saveAddress()
  }

  saveAddress() {
    this.userService
      .saveAddressByUserName(this.addressForm.value)
      .subscribe(() => {
        this.addressForm.reset()
      })
  }


}
