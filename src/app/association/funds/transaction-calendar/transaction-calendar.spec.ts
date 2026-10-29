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

  it('maps positive, zero, and negative transactions to correctly colored events', () => {
    const date = new Date('2026-07-15T22:30:00Z');
    fixture.componentRef.setInput('transactions', [
      { index: 1, description: 'Income', amount: 25, date },
      { index: 2, description: 'Zero', amount: 0, date },
      { index: 3, description: 'Expense', amount: -10, date }
    ]);
    fixture.detectChanges();
    expect(component.events.length).toBe(3);
    expect(component.events[0].color).toEqual(component.events[1].color);
    expect(component.events[2].color).not.toEqual(component.events[0].color);
    expect(component.events[0].title).toBe('Income (25€)');
    expect(component.events[2].title).toBe('Expense (-10€)');
    expect(component.events.map(e => e.meta?.transactionId)).toEqual([1, 2, 3]);
  });

  it('preserves the original UTC instant in calendar events', () => {
    const date = new Date('2026-07-15T22:30:00Z');
    fixture.componentRef.setInput('transactions', [{ index: 42, description: 'Fee', amount: 25, date }]);
    fixture.detectChanges();
    expect(component.events[0].start).toBe(date);
    expect(component.events[0].start.getTime()).toBe(date.getTime());
  });

  it('rebuilds events when transactions change and clears them for an empty list', () => {
    fixture.componentRef.setInput('transactions', [{ index: 1, description: 'Fee', amount: 1, date: new Date() }]);
    fixture.detectChanges();
    expect(component.events.length).toBe(1);
    fixture.componentRef.setInput('transactions', []);
    fixture.detectChanges();
    expect(component.events).toEqual([]);
  });

  it('emits the transaction ID when an event is picked', () => {
    spyOn(component.pickDate, 'emit');
    component.onPickDate({ start: new Date(), title: 'Fee', meta: { transactionId: 42 } });
    expect(component.pickDate.emit).toHaveBeenCalledOnceWith(42);
  });

  it('does not emit an ID when an event has no metadata', () => {
    spyOn(component.pickDate, 'emit');
    component.onPickDate({ start: new Date(), title: 'Fee' });
    expect(component.pickDate.emit).not.toHaveBeenCalled();
  });


});
