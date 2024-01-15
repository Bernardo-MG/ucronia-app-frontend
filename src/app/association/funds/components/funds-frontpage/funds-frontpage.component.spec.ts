import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleModule } from '@app/shared/calendar/calendar.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { TransactionBalanceService } from '../../../transactions/service/transaction-balance.service';
import { TransactionCalendarService } from '../../../transactions/service/transaction-calendar.service';
import { FundsBalanceChartComponent } from '../../../transactions/components/funds-balance-chart/funds-balance-chart.component';
import { FundsCalendarComponent } from '../../../transactions/components/funds-calendar/funds-calendar.component';
import { FundsCurrentBalanceComponent } from '../../../transactions/components/funds-current-balance/funds-current-balance.component';
import { FundsFrontpageComponent } from './funds-frontpage.component';

describe('FundsFrontpageComponent', () => {
  let component: FundsFrontpageComponent;
  let fixture: ComponentFixture<FundsFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ScheduleModule,
        LayoutModule
      ],
      declarations: [
        FundsFrontpageComponent,
        FundsCalendarComponent,
        FundsBalanceChartComponent,
        FundsCurrentBalanceComponent
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
