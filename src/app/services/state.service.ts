import { Injectable } from '@angular/core';
import { BoardItem, Task, TaskStatus } from '../dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _boardItems : BoardItem[] = [
    {
      color: '#6b5ed6',
      type: 'backlog',
      name: 'Backlog',
      tasks: [
        {
          title: 'Create HTML page',
          description: 'lorem ipsum dolor sit amet, consectet, sed diam',
          status: TaskStatus.BACKLOG,
          subtasks: [
            {
              title: 'Create html file',
              status: TaskStatus.DONE,
            },
            {
              title: 'Create html structure',
              status: TaskStatus.DONE,
            },
            {
              title: 'Style html elements',
              status: TaskStatus.TODO,
            },
          ],
        },
        {
          title: 'Create Github repository',
          description: 'lorem ipsum dolor sit amet, consectet, sed diam',
          status: TaskStatus.TODO,
          subtasks: [
            {
              title: 'Create Github account',
              status: TaskStatus.TODO,
            },
          ],
        }
      ],
    },
    {
      color: '#60c48c',
      type: 'todo',
      name: 'ToDo',
      tasks: [],
    },
    {
      color: '#df2b7d',
      type: 'done',
      name: 'Done',
      tasks: [],
    },
    {
      color: '#2359ba',
      type: 'inReview',
      name: 'In-Review',
      tasks: [],
    }
  ];

  public get boardItems() : BoardItem[] {
    return this._boardItems;
  }
  public set boardItems(v : BoardItem[]) {
    this._boardItems = v;
  }

  constructor() { }

  updateTask(task: Task): void {

  }
}
