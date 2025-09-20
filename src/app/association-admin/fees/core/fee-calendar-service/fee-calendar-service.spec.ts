import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FeeCalendarService } from './fee-calendar-service';

describe('FeeCalendarService', () => {
  let service: FeeCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        FeeCalendarService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(FeeCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
