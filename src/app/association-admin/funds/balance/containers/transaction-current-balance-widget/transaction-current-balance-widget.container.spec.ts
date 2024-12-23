import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionBalanceService } from '../../services/transaction-balance.service';
import { FundsCurrentBalanceWidgetContainer } from './transaction-current-balance-widget.container';

describe('FundsCurrentBalanceWidgetContainer', () => {
  let component: FundsCurrentBalanceWidgetContainer;
  let fixture: ComponentFixture<FundsCurrentBalanceWidgetContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FundsCurrentBalanceWidgetContainer
      ],
      providers: [
        TransactionBalanceService
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
