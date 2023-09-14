import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleModule } from '@app/shared/calendar/calendar.module';
import { TransactionService } from '../../service/transaction.service';
import { TransactionCalendarComponent } from './transaction-calendar.component';

describe('TransactionCalendarComponent', () => {
  let component: TransactionCalendarComponent;
  let fixture: ComponentFixture<TransactionCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ScheduleModule
      ],
      declarations: [
        TransactionCalendarComponent
      ],
      providers: [
        TransactionService
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
