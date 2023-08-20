import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGameComponent } from './task-game.component';

describe('TaskGameComponent', () => {
  let component: TaskGameComponent;
  let fixture: ComponentFixture<TaskGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskGameComponent]
    });
    fixture = TestBed.createComponent(TaskGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
