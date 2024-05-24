import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskIDComponent } from './task-id.component';

describe('TaskIDComponent', () => {
  let component: TaskIDComponent;
  let fixture: ComponentFixture<TaskIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskIDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
