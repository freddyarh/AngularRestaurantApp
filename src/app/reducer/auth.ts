import { createReducer, on } from '@ngrx/store';
import { startLoginEmailPassword } from '../actions/auth';

export const initialState = {
    id: '21321',
    name: "Fredy"
};

const _authReducer = createReducer(initialState,
    on(startLoginEmailPassword, (state, { id, name }) => {
        return {
            id: id,
            name: name
        }
    }),
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}