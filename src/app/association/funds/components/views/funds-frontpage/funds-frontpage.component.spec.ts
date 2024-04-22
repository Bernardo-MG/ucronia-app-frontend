import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionBalanceService } from '@app/association/funds/service/transaction-balance.service';
import { TransactionCalendarService } from '@app/association/funds/service/transaction-calendar.service';
import { FundsFrontpageComponent } from './funds-frontpage.component';

describe('FundsFrontpageComponent', () => {
  let component: FundsFrontpageComponent;
  let fixture: ComponentFixture<FundsFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
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
