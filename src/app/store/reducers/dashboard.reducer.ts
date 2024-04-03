import { createReducer, on } from '@ngrx/store';
import { loadInitialData } from '../actions/dashboard.actions';
import { BoardItem } from '../../dashboard/dashboard.component';

export const dashboardKey = 'DashboardState';

export interface Dashboard {
  boardItems: BoardItem[];
}

export const initialState: Dashboard = {
  // TODO: Set initial values here
  boardItems: []
};

export const dashboardReducer = createReducer(
  initialState,
  on(loadInitialData, (state): Dashboard => {
    return {
      ...state,
    };
  }),
);
