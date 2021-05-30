import { Component, OnInit } from '@angular/core';
import { username } from 'config/http.config';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor() { }

  username: string = username

  ngOnInit(): void {
  }

}
