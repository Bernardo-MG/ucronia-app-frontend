import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleModule } from '@app/shared/calendar/calendar.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { BalanceService } from '../../service/balance.service';
import { FundsCalendarService } from '../../service/funds-calendar.service';
import { FundsBalanceChartComponent } from '../funds-balance-chart/funds-balance-chart.component';
import { FundsCalendarComponent } from '../funds-calendar/funds-calendar.component';
import { FundsCurrentBalanceComponent } from '../funds-current-balance/funds-current-balance.component';
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
        FundsCalendarService,
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
