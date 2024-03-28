import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionBalanceService } from '../../../transactions/service/transaction-balance.service';
import { TransactionCalendarService } from '../../../transactions/service/transaction-calendar.service';
import { FundsFrontpageComponent } from './funds-frontpage.component';

describe('FundsFrontpageComponent', () => {
  let component: FundsFrontpageComponent;
  let fixture: ComponentFixture<FundsFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FundsFrontpageComponent
      ],
      providers: [
        TransactionCalendarService,
        TransactionBalanceService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FundsFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
