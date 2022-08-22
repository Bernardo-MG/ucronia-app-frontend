import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeeEditViewComponent } from './admin-fee-edit-view.component';

describe('AdminFeeEditViewComponent', () => {
  let component: AdminFeeEditViewComponent;
  let fixture: ComponentFixture<AdminFeeEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeeEditViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFeeEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
