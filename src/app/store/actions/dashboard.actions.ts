import { createAction, props } from '@ngrx/store';

export const setTitleAction = createAction(
  '[Dashboard] Set new title',
  props<{ title: string }>()
);
