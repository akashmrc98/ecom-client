import { Component, OnInit } from '@angular/core';
import { Address } from '@model/domain/address.model';
import { UserService } from '@service/user/user.service';
import { username } from 'config/http.config';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) { }

  username: string = username

  ngOnInit(): void { this.getAddress() }
  addresses: Address[];
  getAddress() {
    this.userService
      .getAddressByUserUsername()
      .subscribe(addressData => {
        this.addresses = addressData
      })
  }

}
