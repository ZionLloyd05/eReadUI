import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IRegister } from '../../models/IRegister';
import { MatchValidator } from '../../../shared/validators/matchValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  userPayload: IRegister;
  @Output() register = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstname: new FormControl('', [
        Validators.required, Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      lastname: new FormControl('', [
        Validators.required, Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    {
      validator: MatchValidator.passwordMatchValidator
    });
  }

  signUp() {
    this.userPayload = {
      firstname: this.signUpForm.controls.firstname.value,
      lastname: this.signUpForm.controls.lastname.value,
      email: this.signUpForm.controls.email.value,
      password: this.signUpForm.controls.password.value
    };

    this.register.emit(this.userPayload);
  }

};