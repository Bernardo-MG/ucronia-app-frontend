import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionCalendarService } from '../../service/transaction-calendar.service';
import { TransactionCalendarInfoComponent } from './transaction-calendar-info.component';

describe('TransactionCalendarInfoComponent', () => {
  let component: TransactionCalendarInfoComponent;
  let fixture: ComponentFixture<TransactionCalendarInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
