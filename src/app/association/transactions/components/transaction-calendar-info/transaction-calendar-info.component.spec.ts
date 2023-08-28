import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionCalendarService } from '../../service/transaction-calendar.service';
import { TransactionCalendarInfoComponent } from './transaction-calendar-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { CalendarModule } from '@app/shared/calendar/calendar.module';
import { LayoutModule } from '@app/shared/layout/layout.module';

describe('TransactionCalendarInfoComponent', () => {
  let component: TransactionCalendarInfoComponent;
  let fixture: ComponentFixture<TransactionCalendarInfoComponent>;

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
        TransactionCalendarInfoComponent
       ],
       providers:[
        TransactionCalendarService
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCalendarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
