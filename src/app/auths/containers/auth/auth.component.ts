import { UNAUTHORIZED } from './../../../shared/utils/SD';
import { NotifyService } from './../../../shared/services/notify.service';
import { AuthService } from './../../services/auth.service';
import { IUser } from './../../models/IUser';
import { Component, OnInit } from '@angular/core';
import { ILogin } from '../../models/ILogin';
import { Store } from '@ngrx/store';

import * as authActions from '../../state/actions';
import * as fromAuth from '../../state/reducers';
import { IRegister } from '../../models/IRegister';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authState;
  constructor(
    private store: Store<fromAuth.AppState>,
    private notify: NotifyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin(userPayload: ILogin) {
    this.store.dispatch(new authActions.Login(userPayload));
    this.store
      .subscribe(state => {
        this.authState = state.auth;
        if (this.authState && this.authState.isAuthenticated) {
          this.notify.success('Welcome Back!');
          if (this.authState.claims && this.authState.claims.role  === 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        } else if (!this.authState.isAuthenticating && !this.authState.isAuthenticated) {
          if (this.authState.error === UNAUTHORIZED) {
            this.notify.error('Invalid Credentials, Try again!');
          } else {
            this.notify.error('Something went wrong, Try again!');
          }
        }
      });
  }

  onRegister(userPayload: IRegister) {
    this.store.dispatch(new authActions.Register(userPayload));
    this.store
      .subscribe(state => {
        if (state.auth.isRegSuccessful && state.auth.isRegDone) {
          this.notify.success('Good to have you join us!');
        } else if (!state.auth.isAuthenticating && !state.auth.isRegSuccessful) {
          this.notify.error('Something went wrong!');
        }
      })
  }

}
