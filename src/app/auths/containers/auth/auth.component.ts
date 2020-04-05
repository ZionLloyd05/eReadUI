import { Component, OnInit } from '@angular/core';
import { ILogin } from '../../models/ILogin';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onLogin(userPayload: ILogin) {
    console.log(userPayload);
  }

}
