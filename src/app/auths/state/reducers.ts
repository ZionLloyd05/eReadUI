import { IUser } from '../models/IUser';
import * as fromRoot from '../../core/state/IAppState';
import * as authActions from './actions';

import { JwtHelperService } from '@auth0/angular-jwt';

export interface AuthState {
    token: string;
    claims: any;
    isAuthenticating: boolean;
    isAuthenticated: boolean;
    error: string;
};

export interface AppState extends fromRoot.IAppState {
    auth: AuthState;
}

export const initialState: AuthState = {
    token: null,
    claims: null,
    isAuthenticating: false,
    isAuthenticated: false,
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
        default: {
            return state;
        }
    }
}

function saveToken(token: string) {
    // if (rememberMe) {
      localStorage.setItem('token', token);
    // } else {
    //   sessionStorage.setItem('token', token);
    // }
}


function getAuthentication(token) {
    const jwtHelper = new JwtHelperService();
    if (token == null) {
        return { token: null, claims: null, error: null };
    } else {
        const claims = jwtHelper.decodeToken(token);
        if (claims.exp < new Date().getTime() / 1000) {
        return { token: null, claims: null, error: null };
        } else {
        return { token, claims, error: null };
        }
    }
};

function destroyToken() {
    localStorage.removeItem('token');
}
