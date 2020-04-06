import { AuthService } from './../../services/auth.service';
import { IUser } from './../../models/IUser';
import { Component, OnInit } from '@angular/core';
import { ILogin } from '../../models/ILogin';
import { Store } from '@ngrx/store';

import * as authActions from '../../state/actions';
import * as fromAuth from '../../state/reducers';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authState;
  constructor(
    private store: Store<fromAuth.AppState>,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onLogin(userPayload: ILogin) {
    this.store.dispatch(new authActions.Login(userPayload));
    this.store
      .subscribe(state => {
        this.authState = state.auth;
      });
  }

}
