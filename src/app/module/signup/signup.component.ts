import { Component, OnInit } from '@angular/core';
import { UserService } from '@service/user/user.service';
import { FormGroup, FormControl, Validators } from "@angular/forms"

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
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    userRole: new FormControl(null, [Validators.required])
  })

  createUser() {
    const userData = this.userForm.value
    this.userService.saveUser(userData)
  }

}
