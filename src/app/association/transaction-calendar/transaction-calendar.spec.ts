import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionCalendar } from './transaction-calendar';

describe('TransactionCalendar', () => {
  let component: TransactionCalendar;
  let fixture: ComponentFixture<TransactionCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
