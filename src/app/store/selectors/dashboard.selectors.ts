import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Dashboard, dashboardKey } from "../reducers/dashboard.reducer";

const selectFeature = createFeatureSelector<Dashboard>(dashboardKey);

export const dashboardItemsSelector = createSelector(selectFeature, (state: Dashboard)=> {
  return state.boardItems;
})
