import { Component, OnInit, OnDestroy } from '@angular/core';
import { INavbar } from 'src/app/viewmodels/INavbar';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../auths/state/reducers';
import * as authActions from '../../auths/state/actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnDestroy {

  public navbarModel: INavbar;
  subscriber;
  constructor(
    private store: Store<fromAuth.AppState>
  ) { }

  ngOnInit() {
    this.subscriber = this.store.subscribe(state => {
      const authState = state.auth;
      if (authState.claims != null){
        const {unique_name, role} = authState.claims;
        this.navbarModel = {
          name: unique_name,
          role,
          isAuthenticated: authState.isAuthenticated
        };
      }
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  initializeLogout(isLoggedOut){
    if (isLoggedOut) {
      this.store.dispatch(new authActions.Logout());
    }
  }

}
