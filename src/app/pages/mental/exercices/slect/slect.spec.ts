import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slect } from './slect';

describe('Slect', () => {
  let component: Slect;
  let fixture: ComponentFixture<Slect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Slect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
