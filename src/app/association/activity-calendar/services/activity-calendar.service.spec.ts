import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivityCalendarService } from './activity-calendar.service';

describe('ActivityCalendarService', () => {
  let service: ActivityCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ActivityCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
