import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionBalanceService } from '../../services/transaction-balance.service';
import { FundsCurrentBalanceWidgetContainer } from './transaction-current-balance-widget.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FundsCurrentBalanceWidgetContainer', () => {
  let component: FundsCurrentBalanceWidgetContainer;
  let fixture: ComponentFixture<FundsCurrentBalanceWidgetContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [FundsCurrentBalanceWidgetContainer],
    providers: [
        TransactionBalanceService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    fixture = TestBed.createComponent(FundsCurrentBalanceWidgetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
