import { DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { appNameSelector } from '../store/selectors/app.selectors';
import { greetAction } from '../store/actions/app.actions';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TaskItemComponent } from '../shared/task-item/task-item.component';

enum TaskStatus {
  BACKLOG,
  TODO,
  DONE,
  INREVIEW,
}

export interface Task {
  description: string;
  title: string;
  status: TaskStatus;
  subtask: Task[];
}

interface BoardItem {
  color: string;
  data: Task[];
  name: string;
  type: string;
}

interface BoardItems {
  [key: string]: BoardItem;
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
  title = 'task-manager';
  title$: any;
  boardNames!: string[];

  private initialTask: Task = {
    title: '',
    description: '',
    status: TaskStatus.TODO,
    subtask: [],
  };

  boardItems: BoardItems = {
    backlog: {
      color: '#6b5ed6',
      type: 'backlog',
      name: 'Backlog',
      data: [
        {
          title: 'My first task',
          description: 'Short Description',
          status: TaskStatus.TODO,
          subtask: [],
        },
        {
          title: 'My first task',
          description: 'Short Description',
          status: TaskStatus.TODO,
          subtask: [],
        }
      ],
    },
    todo: {
      color: '#60c48c',
      type: 'todo',
      name: 'ToDo',
      data: [],
    },
    done: {
      color: '#df2b7d',
      type: 'done',
      name: 'Done',
      data: [],
    },
    inReview: {
      color: '#2359ba',
      type: 'inReview',
      name: 'In-Review',
      data: [],
    },
  };

  constructor(private store: Store) {
    this.title$ = this.store.select(appNameSelector);

    setTimeout(() => {
      this.store.dispatch(greetAction({ title: 'Nuevo título' }));
    }, 3000);
    this.boardNames = this.getBoardNames();
  }

  getBoardNames(): string[] {
    let names: string[] = [];
    Object.keys(this.boardItems).forEach((board) => {
      names = [...names, this.boardItems[board].type];
    });
    return names;
  }

  dragDropTask(event: any): void {
    console.log('event', event);
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
  }
}
