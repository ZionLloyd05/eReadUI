import { IRegister } from './../models/IRegister';
import { ILogin } from '../models/ILogin';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_COMPLETE = '[Auth] Login Completed',
    LOGIN_FAILURE = '[Auth] Login Failed',
    RETRY_LOGIN = '[Auth] Retry Login',
    LOGOUT = '[Auth] Logout',
    REGISTER = '[Registration] Registration',
    REGISTER_COMPLETE = '[Registration] Registration Completed',
    REGISTER_FAILURE = '[Registration] Registration Failed'
}

export class Login implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: ILogin) {}
}

export class LoginComplete implements Action {
    readonly type = AuthActionTypes.LOGIN_COMPLETE;
    constructor(public payload: any) {}
}

export class RetryLogin implements Action {
    readonly type = AuthActionTypes.RETRY_LOGIN;
    constructor(public payload: string) {}
}

export class LoginFailed implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export class Register implements Action {
    readonly type = AuthActionTypes.REGISTER;
    constructor(public payload: IRegister) {}
}

export class RegisterCompleted implements Action {
    readonly type = AuthActionTypes.REGISTER_COMPLETE;
}

export class RegisterFailed implements Action {
    readonly type = AuthActionTypes.REGISTER_FAILURE;
    constructor(public payload: any) {}
}
export type AuthAction =
Login               |
LoginComplete       |
LoginFailed         |
RetryLogin          |
Logout              |
Register            |
RegisterCompleted   |
RegisterFailed;
