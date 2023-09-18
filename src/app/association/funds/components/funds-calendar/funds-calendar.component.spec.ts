import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleModule } from '@app/shared/calendar/calendar.module';
import { TransactionService } from '../../service/transaction.service';
import { FundsCalendarComponent } from './funds-calendar.component';

describe('FundsCalendarComponent', () => {
  let component: FundsCalendarComponent;
  let fixture: ComponentFixture<FundsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ScheduleModule
      ],
      declarations: [
        FundsCalendarComponent
      ],
      providers: [
        TransactionService
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
