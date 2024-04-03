import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Task, TaskStatus } from '../../dashboard/dashboard.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskStatus = TaskStatus;
  totalSubTaskDone = 0;

  get subtasksControl(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task,
  ) {}

  ngOnInit(): void {
    this.createAddTaskForm();
    this.totalSubTaskDone = this.getTotalSubTaskDone(this.subtasksControl.value);
    this.listenSubtasksChanges();
  }

  createAddTaskForm(): void {
    this.taskForm = this.fb.group({
      subtasks: this.fb.array([

      ]),
      status: [null, Validators.required],
    });

    // Creating the subtask items
    this.task.subtasks?.map(({ title, status }) => {
        this.subtasksControl.push(this.creaetSubTaskGroup(title, status));
    });

    this.taskForm.get('status')?.patchValue(this.task.status);
  }

  getSubTaskControlValue(index: number, property: string): boolean {
    return this.subtasksControl.controls[index].value?.[property];
  }

  getTotalSubTaskDone(subtasks: []): number {
    if (subtasks.length === 0)
      return 0;

    let totalDone = 0;

    subtasks.map(({ isDone }) => {
      if (isDone) {
        totalDone += 1;
      }
    });
    return totalDone;
  }

  listenSubtasksChanges(): void {
    this.subtasksControl.valueChanges.subscribe((value)=> {
      this.totalSubTaskDone = this.getTotalSubTaskDone(value);
    });
  }

  creaetSubTaskGroup(title: string, status: TaskStatus): FormGroup {
    return  this.fb.group({
      title: [title],
      isDone: [status === 'done'? true: false],
    })
  }
}
