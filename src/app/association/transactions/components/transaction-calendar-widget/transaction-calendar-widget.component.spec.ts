import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleModule } from '@app/shared/calendar/calendar.module';
import { TransactionBalanceService } from '../../service/transaction-balance.service';
import { TransactionCalendarService } from '../../service/transaction-calendar.service';
import { TransactionCalendarWidgetComponent } from './transaction-calendar-widget.component';

describe('TransactionCalendarWidgetComponent', () => {
  let component: TransactionCalendarWidgetComponent;
  let fixture: ComponentFixture<TransactionCalendarWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ScheduleModule,
        TransactionCalendarWidgetComponent
      ],
      providers: [
        TransactionCalendarService,
        TransactionBalanceService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionCalendarWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
