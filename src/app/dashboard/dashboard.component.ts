import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TaskItemComponent } from '../shared/task-item/task-item.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewTaskComponent } from '../shared/view-task/view-task.component';
import { StateService } from '../services/state.service';

export enum TaskStatus {
  BACKLOG = 'backlog',
  TODO = 'todo',
  DONE = 'done',
  INREVIEW = 'inReview',
}

export interface Task {
  description?: string;
  title: string;
  status: TaskStatus;
  subtasks?: Task[];
}

export interface BoardItem {
  color: string;
  tasks: Task[];
  name: string;
  type: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    DragDropModule,
    CommonModule,
    MatCardModule,
    MatDividerModule,
    TaskItemComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  boardItems: BoardItem[];

  constructor(
    private dialog: MatDialog,
    private state: StateService,
  ) {
    this.boardItems = state.boardItems;
  }

  dragDropTask(event: CdkDragDrop<Task[]>): void {
    // TODO: Pending to move this to an independent service in order to be used by ngrx
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.state.boardItems = this.boardItems;
  }

  openViewTaskDialog(task: Task): void {
    this.dialog.open(ViewTaskComponent, {
      data: task,
      width: '450px',
    });
  }
}
