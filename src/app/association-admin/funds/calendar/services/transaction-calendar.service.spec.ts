import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionCalendarService } from './transaction-calendar.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TransactionCalendarService', () => {
  let service: TransactionCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(TransactionCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
