import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeYearComponent } from './fee-year.component';

describe('FeeYearComponent', () => {
  let component: FeeYearComponent;
  let fixture: ComponentFixture<FeeYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
