import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { ScheduleModule } from '@app/shared/calendar/calendar.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { BalanceService } from '../../service/balance.service';
import { TransactionCalendarService } from '../../service/transaction-calendar.service';
import { FundsBalanceChartComponent } from '../funds-balance-chart/funds-balance-chart.component';
import { FundsCalendarComponent } from '../funds-calendar/funds-calendar.component';
import { FundsFrontpageComponent } from './funds-frontpage.component';

describe('FundsFrontpageComponent', () => {
  let component: FundsFrontpageComponent;
  let fixture: ComponentFixture<FundsFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        ScheduleModule,
        LayoutModule
      ],
      declarations: [
        FundsFrontpageComponent,
        FundsCalendarComponent,
        FundsBalanceChartComponent
      ],
      providers: [
        TransactionCalendarService,
        BalanceService
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
