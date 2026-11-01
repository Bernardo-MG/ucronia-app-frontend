import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { Transaction } from '@ucronia/domain';
import { firstValueFrom, of, throwError } from 'rxjs';
import { TransactionCalendarService } from './transaction-calendar-service';

describe('TransactionCalendarService', () => {
  let service: TransactionCalendarService;
  let page: jasmine.Spy;
  let range: jasmine.Spy;

  beforeEach(() => {
    page = jasmine.createSpy('page');
    range = jasmine.createSpy('range');
    TestBed.configureTestingModule({
      providers: [{ provide: UcroniaClient, useValue: { transaction: { page, range } } }]
    });
    service = TestBed.inject(TransactionCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  function lastPage(content: Transaction[] = []) {
    return { page: 1, last: true, content };
  }

  it('requests exactly the Monday-first calendar grid with inclusive end of day', async () => {
    page.and.returnValue(of(lastPage()));
    await firstValueFrom(service.getCalendarInRange(2026, 6)); // July (zero-based)
    const args = page.calls.mostRecent().args;
    expect(args[0]).toBe(1);
    expect(args[1]).toBe(100);
    expect(args[4]).toEqual(new Date(2026, 5, 29, 0, 0, 0, 0));
    expect(args[5]).toEqual(new Date(2026, 7, 2, 23, 59, 59, 999));
  });

  it('includes only visible adjacent-month days for February 2026', async () => {
    page.and.returnValue(of(lastPage()));
    await firstValueFrom(service.getCalendarInRange(2026, 1));
    const args = page.calls.mostRecent().args;
    expect(args[4]).toEqual(new Date(2026, 0, 26, 0, 0, 0, 0));
    expect(args[5]).toEqual(new Date(2026, 2, 1, 23, 59, 59, 999));
  });

  it('handles month ranges spanning a year boundary', async () => {
    page.and.returnValue(of(lastPage()));
    await firstValueFrom(service.getCalendarInRange(2026, 11));
    const args = page.calls.mostRecent().args;
    expect(args[4].getFullYear()).toBe(2026);
    expect(args[5].getFullYear()).toBe(2027);
  });

  it('uses local calendar boundaries even across a daylight-saving transition', async () => {
    page.and.returnValue(of(lastPage()));
    await firstValueFrom(service.getCalendarInRange(2026, 2)); // March
    const args = page.calls.mostRecent().args;
    expect(args[4].getHours()).toBe(0);
    expect(args[4].getMinutes()).toBe(0);
    expect(args[5].getHours()).toBe(23);
    expect(args[5].getMinutes()).toBe(59);
    expect(args[5].getSeconds()).toBe(59);
    expect(args[5].getMilliseconds()).toBe(999);
  });

  it('combines transactions from all pages', async () => {
    const first = { index: 1, date: new Date('2026-07-15T22:30:00Z') } as Transaction;
    const second = { index: 2, date: new Date('2026-07-16T00:30:00Z') } as Transaction;
    page.and.callFake((number: number) => of(number === 1
      ? { page: 1, last: false, content: [first] }
      : { page: 2, last: true, content: [second] }));
    const result = await firstValueFrom(service.getCalendarInRange(2026, 6));
    expect(result).toEqual([first, second]);
    expect(page.calls.count()).toBe(2);
    expect(page.calls.allArgs().map(args => args[0])).toEqual([1, 2]);
  });

  it('returns an empty array for an empty page', async () => {
    page.and.returnValue(of(lastPage()));
    expect(await firstValueFrom(service.getCalendarInRange(2026, 6))).toEqual([]);
  });

  it('does not shift UTC transaction timestamps', async () => {
    const date = new Date('2026-07-15T22:30:00Z');
    const transaction = { index: 7, date } as Transaction;
    page.and.returnValue(of(lastPage([transaction])));
    const result = await firstValueFrom(service.getCalendarInRange(2026, 6));
    expect(result[0].date).toBe(date);
    expect(result[0].date.toISOString()).toBe('2026-07-15T22:30:00.000Z');
  });

  it('propagates API failures', async () => {
    const failure = new Error('API failed');
    page.and.returnValue(throwError(() => failure));
    await expectAsync(firstValueFrom(service.getCalendarInRange(2026, 6))).toBeRejectedWith(failure);
  });

  it('returns the available months from the API', async () => {
    const months = [{ year: 2026, month: 7 }];
    range.and.returnValue(of(months));
    expect(await firstValueFrom(service.getRange())).toBe(months);
    expect(range).toHaveBeenCalledTimes(1);
  });

});
