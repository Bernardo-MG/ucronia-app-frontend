import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TransactionCalendarService } from './transaction-calendar-service';

describe('TransactionCalendarService', () => {
  let service: TransactionCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    });
    service = TestBed.inject(TransactionCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
