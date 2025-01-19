import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionBalanceService } from '../../../balance/services/transaction-balance.service';
import { TransactionCalendarService } from '../../services/transaction-calendar.service';
import { TransactionCalendarWidgetContainer } from './transaction-calendar-widget.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TransactionCalendarWidgetContainer', () => {
  let component: TransactionCalendarWidgetContainer;
  let fixture: ComponentFixture<TransactionCalendarWidgetContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        TransactionCalendarWidgetContainer],
    providers: [
        TransactionCalendarService,
        TransactionBalanceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
