import { createAction, props } from '@ngrx/store';

export const greetAction = createAction(
  '[App] Set Welcome Greeting',
  props<{ title: string }>()
);
