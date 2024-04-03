import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { createAction, props } from '@ngrx/store';
import { Task } from '../../dashboard/dashboard.component';

export const loadInitialData = createAction('[Dashboard] Load Initial Data');

export const dragDropTaskAction = createAction(
  '[Dashboard] Drag and Drop Task',
  props<{ event: CdkDragDrop<Task[]> }>()
);
