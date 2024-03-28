import { createAction, props } from '@ngrx/store';

export const greetAction = createAction(
  '[AppModule] Set Welcome Greeting',
  props<{ newGreet: string }>()
);
