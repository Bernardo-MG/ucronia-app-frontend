import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBalanceTransactionCreateViewComponent } from './admin-balance-transaction-create-view.component';

describe('AdminBalanceTransactionCreateViewComponent', () => {
  let component: AdminBalanceTransactionCreateViewComponent;
  let fixture: ComponentFixture<AdminBalanceTransactionCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBalanceTransactionCreateViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBalanceTransactionCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
