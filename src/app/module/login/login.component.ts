import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthData } from '@model/auth.model';
import { AuthService } from '@service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = false


  userLoginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })


  login() {
    const authData: AuthData = this.userLoginForm.value
    this.authService.login(authData)
      .subscribe(response => {
        localStorage.setItem("id", response.id.toString())
        localStorage.setItem("username", response.username)
        localStorage.setItem("accessToken", response.accessToken)
        localStorage.setItem("refreshToken", response.refreshToken)
        localStorage.setItem("cartId", response.cartId.toString())
        localStorage.setItem("wishListId", response.wishListId.toString())
        this.router.navigate(["products"])
      })
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }



}