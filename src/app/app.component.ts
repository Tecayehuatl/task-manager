import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

interface MenuItem {
  path: string;
  icon: string;
  text: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isExpanded = false;

  menuItems: MenuItem[] = [
    {
      path: '',
      icon: 'assignment',
      text: 'Platform Lunch',
    },
    {
      path: '',
      icon: 'assignment',
      text: 'Marketin Plan',
    },
    {
      path: '',
      icon: 'assignment',
      text: 'Roadmap',
    },
    {
      path: '',
      icon: 'add',
      text: 'Create New Board',
    },
  ];

  constructor(private store: Store) {
  }
}
