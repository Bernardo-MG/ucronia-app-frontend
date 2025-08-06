import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TransactionBalanceService } from '@app/association-admin/funds/balance/services/transaction-balance.service';
import { TransactionCalendarService } from '@app/association-admin/funds/calendar/services/transaction-calendar.service';
import { FundsListComponent } from './funds-list.container';

describe('FundsListComponent', () => {
  let component: FundsListComponent;
  let fixture: ComponentFixture<FundsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FundsListComponent
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

    fixture = TestBed.createComponent(FundsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
