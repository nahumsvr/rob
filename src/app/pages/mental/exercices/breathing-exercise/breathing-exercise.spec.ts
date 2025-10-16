import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreathingExercise } from './breathing-exercise';

describe('BreathingExercise', () => {
  let component: BreathingExercise;
  let fixture: ComponentFixture<BreathingExercise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreathingExercise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreathingExercise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
