import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TransactionBalanceService } from '@app/association-admin/funds/balance/services/transaction-balance.service';
import { TransactionCalendarService } from '@app/association-admin/funds/core/transaction-calendar-service/transaction-calendar-service';
import { Funds } from './funds';

describe('Funds', () => {
  let component: Funds;
  let fixture: ComponentFixture<Funds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Funds
      ],
      providers: [
        TransactionCalendarService,
        TransactionBalanceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Funds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
