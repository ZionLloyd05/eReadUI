import { IUser } from '../models/IUser';
import * as fromRoot from '../../core/state/IAppState';
import * as authActions from './actions';

export interface AuthState {
    user: IUser;
    authenticating: boolean;
    authenticated: boolean;
    error: string;
};

export interface AppState extends fromRoot.IAppState {
    auth: AuthState;
}

export const initialState: AuthState = {
    user: null,
    authenticating: false,
    authenticated: false,
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
                authenticating: true
            };
        }
    }
}