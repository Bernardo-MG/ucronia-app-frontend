import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionBalanceService } from '../../service/transaction-balance.service';
import { FundsCurrentBalanceComponent } from './transaction-current-balance.component';

describe('FundsCurrentBalanceComponent', () => {
  let component: FundsCurrentBalanceComponent;
  let fixture: ComponentFixture<FundsCurrentBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FundsCurrentBalanceComponent
      ],
      providers: [
        TransactionBalanceService
      ]
    });
    fixture = TestBed.createComponent(FundsCurrentBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
