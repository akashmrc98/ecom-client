import { Component, OnInit } from '@angular/core';
import { UserService } from '@service/user/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms"
import { ValidatePassword } from 'validators/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void { }

  hide: boolean = true

  userForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.min(10), Validators.max(12)]),
    gender: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    userRole: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern(`(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})`)]),
    confirmPassword: new FormControl(null, [Validators.required]),
  }
  )

  createUser() {
    if (this.userForm.valid) {
      const userData = this.userForm.value
      this.userService.saveUser(userData)
    }
  }

}
