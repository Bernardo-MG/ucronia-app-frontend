import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentCreateViewComponent } from './admin-payment-create-view.component';

describe('AdminPaymentCreateViewComponent', () => {
  let component: AdminPaymentCreateViewComponent;
  let fixture: ComponentFixture<AdminPaymentCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaymentCreateViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPaymentCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
