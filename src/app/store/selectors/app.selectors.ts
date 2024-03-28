import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../reducers/app.reducer";
import { appKey } from "../../app.config";

const selectFeature = createFeatureSelector<AppState>(appKey);

export const appNameSelector = createSelector(selectFeature, (state: AppState)=> state.title)
