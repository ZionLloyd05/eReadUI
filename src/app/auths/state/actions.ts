import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ILogin } from '../models/ILogin';

export enum AuthActionTypes {
    LOGIN = '[User] Login',
    LOGIN_COMPLETE = '[User] Login Completed',
    LOGIN_FAILURE = '[User] Login Failed'
}

export class Login implements Action {
    readonly type = AuthActionTypes.LOGIN;

    constructor(public payload: ILogin) {}
}

export class LoginComplete implements Action {
    readonly type = AuthActionTypes.LOGIN_COMPLETE;
}

export type Action = Login;
