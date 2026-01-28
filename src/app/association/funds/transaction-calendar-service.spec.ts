import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { TransactionCalendarService } from './transaction-calendar-service';

describe('TransactionCalendarService', () => {
  let service: TransactionCalendarService;

  const mockUcroniaClient = {
    transaction: {
      page: jasmine.createSpy().and.returnValue(of({})),
      range: jasmine.createSpy().and.returnValue(of({}))
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(TransactionCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
