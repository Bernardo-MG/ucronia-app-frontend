import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCalendarWidgetComponent } from './transaction-calendar-widget.component';

describe('TransactionCalendarWidgetComponent', () => {
  let component: TransactionCalendarWidgetComponent;
  let fixture: ComponentFixture<TransactionCalendarWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionCalendarWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionCalendarWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
