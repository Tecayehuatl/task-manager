import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Task, TaskStatus } from '../../dashboard/dashboard.component';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskStatus = TaskStatus;

  get subtasksControl(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private state: StateService,
  ) {}

  ngOnInit(): void {
    this.createAddTaskForm();
  }

  createAddTaskForm(): void {
    this.taskForm = this.fb.group({
      title: [null, Validators.required],
      description: [null],
      subtasks: this.fb.array([]),
      status: [null, Validators.required],
    });
  }

  createSubtaskControl(): FormGroup {
    return this.fb.group({
      title: [null, Validators.required],
      status: [this.taskStatus.TODO]
    });
  }

  addSubtaskToForm(): void {
    this.subtasksControl.push(this.createSubtaskControl());
  }

  removeSubtask(index: number): void {
     this.subtasksControl.removeAt(index);
  }

  createTask(task: Task): void {
    if (this.taskForm.invalid)
      return;

    this.state.boardItems.map((board, index) => {
      if(board.type === task.status) {
        this.state.boardItems[index].tasks.push(task);
      }
    });
  }
}
