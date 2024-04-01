import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StrikeThroughDirective } from '../../directives/strike-through.directive';

@Component({
  selector: 'app-subtask',
  standalone: true,
  imports: [
    StrikeThroughDirective,
    MatCheckboxModule
  ],
  templateUrl: './subtask.component.html',
  styleUrl: './subtask.component.scss'
})
export class SubtaskComponent implements OnInit {
  // @Input() set checkedVal(value: boolean) {

    // }
  @Input() checkedVal!: boolean;

  ngOnInit(): void {
      // console.log(this.checkedVal);
  }
}
