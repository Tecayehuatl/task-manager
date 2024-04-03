import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { provideState } from '@ngrx/store';
import { dashboardKey, dashboardReducer } from './store/reducers/dashboard.reducer';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    providers: [
      provideState({ name: dashboardKey, reducer: dashboardReducer })
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
