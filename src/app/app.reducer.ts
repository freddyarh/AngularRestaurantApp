import { ActionReducerMap } from '@ngrx/store';
import * as auth from './reducer/auth';
import * as ui from './reducer/ui';

export interface AppState {
    auth: auth.AuthState,
    ui: ui.State
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: auth.authReducer,
    ui: ui.uiReducer
}