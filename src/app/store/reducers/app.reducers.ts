import { createReducer, on } from '@ngrx/store';
import { greetAction } from '../actions/app.actions';

export interface State {
  name: string;
}

export const initialState: State = {
  name: '',
};

export interface AppState {
  appState: State;
}

export const appReducers = createReducer(
  initialState as State,
  on(greetAction, (state, { newGreet: newName }) => {
    return {
      ...state,
      name: newName
    };
  })
);
