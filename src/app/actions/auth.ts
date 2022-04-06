import { createAction, props } from '@ngrx/store';

export const startLoginEmailPassword = createAction(
    '[Start Login] login',
    props<{ id: string, name: string }>()
);