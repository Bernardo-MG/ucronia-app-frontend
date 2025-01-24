import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TransactionBalanceService } from '../../../balance/services/transaction-balance.service';
import { TransactionCalendarService } from '../../services/transaction-calendar.service';
import { TransactionCalendarWidgetContainer } from './transaction-calendar-widget.container';

describe('TransactionCalendarWidgetContainer', () => {
  let component: TransactionCalendarWidgetContainer;
  let fixture: ComponentFixture<TransactionCalendarWidgetContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransactionCalendarWidgetContainer
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

    fixture = TestBed.createComponent(TransactionCalendarWidgetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
