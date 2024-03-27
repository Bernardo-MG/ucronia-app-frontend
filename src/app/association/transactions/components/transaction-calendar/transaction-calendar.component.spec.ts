import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleModule } from '@app/shared/calendar/calendar.module';
import { TransactionCalendarService } from '../../service/transaction-calendar.service';
import { TransactionCalendarComponent } from './transaction-calendar.component';

describe('TransactionCalendarComponent', () => {
  let component: TransactionCalendarComponent;
  let fixture: ComponentFixture<TransactionCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ScheduleModule,
        TransactionCalendarComponent
      ],
      providers: [
        TransactionCalendarService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
