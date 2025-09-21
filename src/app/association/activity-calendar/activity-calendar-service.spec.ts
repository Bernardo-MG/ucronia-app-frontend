import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivityCalendarService } from './activity-calendar-service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ActivityCalendarService', () => {
  let service: ActivityCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ActivityCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
