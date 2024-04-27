import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionBalanceService } from '../../../service/transaction-balance.service';
import { FundsCurrentBalanceWidgetComponent } from './transaction-current-balance-widget.component';

describe('FundsCurrentBalanceWidgetComponent', () => {
  let component: FundsCurrentBalanceWidgetComponent;
  let fixture: ComponentFixture<FundsCurrentBalanceWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FundsCurrentBalanceWidgetComponent
      ],
      providers: [
        TransactionBalanceService
      ]
    });
    fixture = TestBed.createComponent(FundsCurrentBalanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
