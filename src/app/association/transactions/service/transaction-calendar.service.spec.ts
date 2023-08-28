import { TestBed } from '@angular/core/testing';

import { TransactionCalendarService } from './transaction-calendar.service';

describe('TransactionCalendarService', () => {
  let service: TransactionCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
