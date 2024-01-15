import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleModule } from '@app/shared/calendar/calendar.module';
import { TransactionCalendarService } from '../../service/transaction-calendar.service';
import { FundsCalendarComponent } from './funds-calendar.component';

describe('FundsCalendarComponent', () => {
  let component: FundsCalendarComponent;
  let fixture: ComponentFixture<FundsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ScheduleModule
      ],
      declarations: [
        FundsCalendarComponent
      ],
      providers: [
        TransactionCalendarService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FundsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
