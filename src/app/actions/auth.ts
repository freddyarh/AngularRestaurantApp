import { createAction, props } from '@ngrx/store';
import { UserSignIn } from '../models/userSignIn';

export const login = createAction(
    '[Start Login] login',
    props<{ user: UserSignIn }>()
);

export const logout = createAction(
    '[Start Login] logout'
);