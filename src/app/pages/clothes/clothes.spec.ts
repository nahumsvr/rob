import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clothes } from './clothes';

describe('Clothes', () => {
  let component: Clothes;
  let fixture: ComponentFixture<Clothes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Clothes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Clothes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
