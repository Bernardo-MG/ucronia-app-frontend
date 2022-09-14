import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeTableComponent } from './fee-table.component';

describe('FeeTableComponent', () => {
  let component: FeeTableComponent;
  let fixture: ComponentFixture<FeeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
