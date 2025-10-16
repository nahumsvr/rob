import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mental } from './mental';

describe('Mental', () => {
  let component: Mental;
  let fixture: ComponentFixture<Mental>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mental]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mental);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
