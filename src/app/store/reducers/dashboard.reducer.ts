import { createReducer, on } from '@ngrx/store';
import { setTitleAction } from '../actions/dashboard.actions';

export const dashboardKey = 'DashboardState';

export interface Dashboard {
  title: string;
}

export const initialState: Dashboard = {
  title: 'My dashboard',
};

export interface DashboardState {
  dashboardState: Dashboard;
}

export const dashboardReducer = createReducer(
  initialState,
  on(setTitleAction, (state, { title }): Dashboard => {
    return {
      ...state,
      title,
    };
  })
);
