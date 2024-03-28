import { createReducer, on } from '@ngrx/store';
import { greetAction } from '../actions/app.actions';

export interface AppState {
  title: string;
}

export const initialAppState: AppState = {
  title: 'Initial app state title',
};

export const appReducer = createReducer(
  initialAppState,
  on(greetAction, (state, { title }): AppState => {
    return {
      ...state,
      title
    };
  })
);
