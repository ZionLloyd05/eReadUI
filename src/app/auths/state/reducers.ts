import { IUser } from '../models/IUser';
import * as fromRoot from '../../core/state/IAppState';
import * as authActions from './actions';

import { JwtHelperService } from '@auth0/angular-jwt';

export interface AuthState {
    token: string;
    claims: any;
    isAuthenticating: boolean;
    isAuthenticated: boolean;
    isRegSuccessful: boolean;
    isRegDone: boolean;
    error: string;
}

export interface AppState extends fromRoot.IAppState {
    auth: AuthState;
}

export const initialState: AuthState = {
    token: null,
    claims: null,
    isAuthenticating: false,
    isAuthenticated: false,
    isRegSuccessful: false,
    isRegDone: false,
    error: ''
};

export function authReducer(
    state = initialState,
    action: authActions.Action
): AuthState {
    switch (action.type) {
        case authActions.AuthActionTypes.LOGIN: {
            return {
                ...state,
                isAuthenticating: true
            };
        }
        case authActions.AuthActionTypes.LOGIN_COMPLETE: {
            const {token} = action.payload;
            saveToken(token);
            return {
                ...state,
                ...getAuthentication(token),
                isAuthenticating: false,
                isAuthenticated: true,
            };
        }
        case authActions.AuthActionTypes.RETRY_LOGIN: {
            const token = action.payload;
            if (isTokenExpired(token)) {
                return {
                    ...state,
                    isAuthenticating: false,
                    isAuthenticated: false,
                };
            }
            return {
                ...state,
                ...getAuthentication(token),
                isAuthenticating: false,
                isAuthenticated: true,
            };
        }
        case authActions.AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: false,
                error: action.payload
            };
        }
        case authActions.AuthActionTypes.LOGOUT: {
            destroyToken();
            return {
                ...state,
                token: null,
                claims: null,
                isAuthenticating: false,
                isAuthenticated: false,
                error: ''
            };
        }
        case authActions.AuthActionTypes.REGISTER: {
            return {
                ...state,
                isAuthenticating: true
            };
        }
        case authActions.AuthActionTypes.REGISTER_COMPLETE: {
            return {
                ...state,
                isAuthenticating: false,
                isRegSuccessful: true,
                isRegDone: true
            };
        }
        case authActions.AuthActionTypes.REGISTER_FAILURE: {
            return {
                ...state,
                isAuthenticating: false,
                isRegSuccessful: false,
                error: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

function saveToken(token: string) {

    const tokenInStorage = localStorage.getItem('token') || null;
    if (tokenInStorage != null) {
        localStorage.setItem('token', token);
    }
}


function getAuthentication(token) {
    console.log('hello bro');
    console.log(token);
    const jwtHelper = new JwtHelperService();
    if (token == null) {
        return { token: null, claims: null, error: null };
    } else {
        if(isTokenExpired(token)){
            return { token: null, claims: null, error: null };
        } else {
            const claims = jwtHelper.decodeToken(token);
            return { token, claims, error: null };
        }
    }
}

function isTokenExpired(token) {
    const jwtHelper = new JwtHelperService();

    const claims = jwtHelper.decodeToken(token);

    if (claims.exp < new Date().getTime() / 1000) {
        return true;
    } else {
        return false;
    }
}

function destroyToken() {
    localStorage.removeItem('token');
}
