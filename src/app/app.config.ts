import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { dashboardKey, dashboardReducer } from './store/reducers/dashboard.reducer';
import { appReducer } from './store/reducers/app.reducer';

export const appKey = 'AppState';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ [dashboardKey]: dashboardReducer }),
    provideState({ name: appKey, reducer: appReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
