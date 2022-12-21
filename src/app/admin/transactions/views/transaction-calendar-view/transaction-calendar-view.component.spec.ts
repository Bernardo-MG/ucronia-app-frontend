import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCalendarViewComponent } from './transaction-calendar-view.component';

describe('TransactionCalendarViewComponent', () => {
  let component: TransactionCalendarViewComponent;
  let fixture: ComponentFixture<TransactionCalendarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCalendarViewComponent ]
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
