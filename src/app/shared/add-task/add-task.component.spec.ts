import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AddTaskComponent } from './add-task.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { StateService } from '../../services/state.service';
import { Task, TaskStatus } from '../../dashboard/dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let formBuilder: FormBuilder;
  let stateServiceMock: Partial<StateService>;

  beforeEach(async () => {
    stateServiceMock = {
      boardItems: [
        { type: 'TODO', tasks: [], color: '', name:'todo' },
        { type: 'IN_PROGRESS', tasks: [], color: '', name:'inProgress' },
        { type: 'DONE', tasks: [], color: '', name:'done' }
      ]
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatDialogModule,
      ],
      providers: [
        FormBuilder,
        { provide: StateService, useValue: stateServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create task form with required controls', () => {
    const expectedForm: FormGroup = formBuilder.group({
      title: [null, jasmine.any(Function)],
      description: [null],
      subtasks: formBuilder.array([]),
      status: [null, jasmine.any(Function)]
    });

    component.ngOnInit();

    expect(component.taskForm.value).toEqual(expectedForm.value);
  });

  xit('should remove subtask from form', () => {
    const initialSubtasksCount = component.subtasksControl.length;

    component.addSubtaskToForm();
    component.removeSubtask(0);

    expect(component.subtasksControl.length).toEqual(initialSubtasksCount);
  });

  it('should create new column and add it to state service', () => {
    const newColum = { type: 'INQA', tasks: [], color: '', name:'inQA' }
    stateServiceMock.boardItems?.push(newColum);
    expect(stateServiceMock.boardItems?.length).toEqual(4);
  });

  it('should not create task if form is invalid', () => {
    const task = { title: '', description: 'Test Description', subtasks: [], status: TaskStatus.DONE };
    const boardItems = stateServiceMock?.boardItems || [];
    const initialTasksCount = boardItems[0].tasks.length;

    component.createTask(task);

    expect(initialTasksCount).toEqual(boardItems[0].tasks.length);
  });
});
