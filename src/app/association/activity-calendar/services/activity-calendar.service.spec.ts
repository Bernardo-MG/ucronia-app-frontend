import { TestBed } from '@angular/core/testing';

import { ActivityCalendarService } from './activity-calendar.service';

describe('ActivityCalendarService', () => {
  let service: ActivityCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
