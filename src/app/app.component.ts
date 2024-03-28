import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { appNameSelector } from './store/selectors/app.selectors';
import { greetAction } from './store/actions/app.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-manager';
  title$: any;

  constructor(private store: Store) {
    this.title$ = this.store.select(appNameSelector);

    setTimeout(() => {
      this.store.dispatch(greetAction({ title: 'Nuevo título' }));
    }, 3000);
  }
}
