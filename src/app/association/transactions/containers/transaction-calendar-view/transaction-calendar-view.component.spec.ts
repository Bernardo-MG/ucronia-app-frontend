import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { CalendarModule } from '@app/shared/calendar/calendar.module';
import { TransactionTabsComponent } from '../../components/transaction-tabs/transaction-tabs.component';
import { TransactionService } from '../../service/transaction.service';
import { TransactionCalendarViewComponent } from './transaction-calendar-view.component';

describe('TransactionCalendarViewComponent', () => {
  let component: TransactionCalendarViewComponent;
  let fixture: ComponentFixture<TransactionCalendarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        CalendarModule
      ],
      declarations: [
        TransactionCalendarViewComponent,
        TransactionTabsComponent
      ],
      providers: [
        TransactionService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
