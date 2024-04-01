import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskStatus } from '../../dashboard/dashboard.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SubtaskComponent } from '../components/subtask/subtask.component';
import { StrikeThroughDirective } from '../directives/strike-through.directive';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    // MatInputModule,
    // MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    SubtaskComponent,
    StrikeThroughDirective,
  ],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskStatus = TaskStatus;

  get subtasksControl(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createAddTaskForm();
  }

  createAddTaskForm(): void {
    this.taskForm = this.fb.group({
      subtasks: this.fb.array([
        {
          title: 'test 1',
          isDone: false,
        },
        {
          title: 'test 2',
          isDone: false,
        },

      ]),
      status: [null, Validators.required],
    });
  }

  getSubtaskValueForm(index: number) {
    return this.subtasksControl.controls[index];
  }
}
