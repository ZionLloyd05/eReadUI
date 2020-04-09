import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ILogin } from '../../models/ILogin';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  userPayload: ILogin;

  @Output() login = new EventEmitter();
  @Input() user;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  authenticateUser() {
    this.userPayload = {
      email: this.signInForm.controls.email.value,
      password: this.signInForm.controls.password.value
    };

    this.login.emit(this.userPayload);
  }

}
