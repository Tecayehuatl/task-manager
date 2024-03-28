import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { AppState, appReducers } from './app.reducers';

export const reducers: ActionReducerMap<AppState> = {
  appState: appReducers
};
export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
