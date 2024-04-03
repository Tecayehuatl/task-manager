import { Component, Input, OnInit } from '@angular/core';
import { Task, TaskStatus } from '../../dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  totalSubTaskDone: number = 0;

  ngOnInit(): void {
    this.totalSubTaskDone = this.getTotalSubTaskDone(this.task?.subtasks || []);
  }

  getTotalSubTaskDone(subtasks: Task[]): number {
    if (subtasks.length === 0)
      return 0;

    let totalDone = 0;

    subtasks.map(({ status }) => {
      if (status === TaskStatus.DONE) {
        totalDone += 1;
      }
    });
    return totalDone;
  }
}
