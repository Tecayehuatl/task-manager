import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './shared/add-task/add-task.component';

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
    MatToolbarModule,
    RouterModule,
    MatSlideToggleModule,
    MatButtonModule,
    OverlayModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isExpanded = false;

  menuItems: MenuItem[] = [
    {
      path: '/dashboard',
      icon: 'assignment',
      text: 'Dashboard',
    },
  ];

  @HostBinding('class') className = '';
  darkClass= 'theme-dark';
  lightClass= 'theme-light';

  constructor(
    private overlay: OverlayContainer,
    public dialog: MatDialog
  ) { }

  toggleTheme(event: MatSlideToggleChange): void {
    this.className = event.checked ? this.darkClass : this.lightClass;

    if(event.checked) {
      this.overlay.getContainerElement().classList.add(this.className);
    } else {
      this.overlay.getContainerElement().classList.remove(this.className);
    }
  }

  openAddTaskDialog(): void {
    this.dialog.open(AddTaskComponent, { width: '450px' });
  }
}
