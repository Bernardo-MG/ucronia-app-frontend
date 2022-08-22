import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeTableFormComponent } from './fee-table-form.component';

describe('FeeTableFormComponent', () => {
  let component: FeeTableFormComponent;
  let fixture: ComponentFixture<FeeTableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeTableFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
