import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { TaskStatus } from '../../dashboard/dashboard.component';

export enum SubTaskStatus {
  TODO = 'todo',
  DONE = 'done'
}

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
  subtaskStatus = TaskStatus;

  get subtasksControl(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

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
      status: [this.subtaskStatus.TODO]
    });
  }

  addSubtaskToForm(): void {
    this.subtasksControl.push(this.createSubtaskControl());
  }

  removeSubtask(index: number): void {
     this.subtasksControl.removeAt(index);
  }
}
