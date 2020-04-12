import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';

import * as authActions from '../auths/state/actions';
import * as fromAuth from '../auths/state/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'eRead';

  constructor(
    private router: Router,
    private store: Store<fromAuth.AppState>,
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.checkIfUserIsLoggedIn();
      }
    });
  }

  checkIfUserIsLoggedIn() {
  const token = localStorage.getItem('token') || null;
  if (token == null) {
    return;
  }

  this.store.dispatch(new authActions.RetryLogin(token));
}
}
