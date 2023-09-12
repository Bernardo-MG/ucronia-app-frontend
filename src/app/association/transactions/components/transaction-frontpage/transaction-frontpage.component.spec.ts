import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { CalendarModule } from '@app/shared/calendar/calendar.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { TransactionCalendarService } from '../../service/transaction-calendar.service';
import { TransactionCalendarComponent } from '../transaction-calendar/transaction-calendar.component';
import { TransactionFrontpageComponent } from './transaction-frontpage.component';

describe('TransactionFrontpageComponent', () => {
  let component: TransactionFrontpageComponent;
  let fixture: ComponentFixture<TransactionFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CoreModule,
        CalendarModule,
        LayoutModule
      ],
      declarations: [
        TransactionFrontpageComponent,
        TransactionCalendarComponent
      ],
      providers: [
        TransactionCalendarService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
