import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { appNameSelector } from './store/selectors/app.selectors';
import { greetAction } from './store/actions/app.actions';

interface BoardItem {
  type: string;
  data: number[];
}

interface BoardItems {
  [key: string]: BoardItem;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DragDropModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-manager';
  title$: any;
  boardNames!: string[];

  boardItems: BoardItems = {
    backlog: {
      type: 'backlog',
      data: [1,1,3],
    },
    todo: {
      type: 'todo',
      data: [2,2,3],
    },
    done: {
      type: 'done',
      data: [3,3,3],
    },
    inReview: {
      type: 'inReview',
      data: [4,4,3],
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
    Object.keys(this.boardItems).forEach((board)=> {
      names = [...names, this.boardItems[board].type]
    })
    return names;
  }

  dropTask(event: any): void {
    console.log('event', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
