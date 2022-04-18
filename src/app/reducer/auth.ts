import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/auth';
import { UserSignIn } from '../models/userSignIn';

export interface AuthState {
    user: UserSignIn
}

export const initialState: AuthState = {
    user: null
};

const _authReducer = createReducer(initialState,
    on(login, (state, { user }) => ({ ...state, user: { ...user } })),
    on(logout, state => ({ ...state, user: null })),
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}