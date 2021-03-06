import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDTO } from '@model/dto/auth.dto';
import { AuthService } from '@service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true

  userLoginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })


  login() {
    const authData: AuthDTO = this.userLoginForm.value
    this.authService.login(authData)
      .subscribe(response => {
        localStorage.setItem("username", response.username)
        localStorage.setItem("accessToken", response.accessToken)
        localStorage.setItem("refreshToken", response.refreshToken)
        localStorage.setItem("userId", response.userId.toString())
        this.router.navigate(["products"])
      })
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }



}