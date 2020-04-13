import { ILogin } from './../models/ILogin';
import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import * as authActions from './actions';

import { AuthService } from '../services/auth.service';

import { Observable, of } from 'rxjs';
import { map, mergeMap, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { IRegister } from '../models/IRegister';

@Injectable()
export class AuthEffect {
    constructor(
        private action$: Actions,
        private authService: AuthService
    ) {}

    @Effect()
    LogIn$: Observable<Action> = this.action$
        .pipe(
            ofType<authActions.Login>(
                authActions.AuthActionTypes.LOGIN
            ),
            map((action: authActions.Login) => action.payload),
            switchMap((login: ILogin) => {
                return this.authService.authenticate(login)
                    .pipe(
                        map(res => {
                            console.log(res);
                            return new authActions.LoginComplete(res);
                        }),
                        catchError(err => {
                            return of(new authActions.LoginFailed(err));
                        })
                    );
            })
        );

    @Effect()
    Register$: Observable<Action> = this.action$
        .pipe(
            ofType<authActions.Register>(
                authActions.AuthActionTypes.REGISTER
            ),
            map((action: authActions.Register) => action.payload),
            exhaustMap((newUser: IRegister) => 
                this.authService.register(newUser)
                    .pipe(
                        map(() =>
                            new authActions.RegisterCompleted()
                        ),
                        catchError(err => of(new authActions.RegisterFailed(err)))
                    )
            )
        );
}