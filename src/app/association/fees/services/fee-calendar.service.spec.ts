import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FeeCalendarService } from './fee-calendar.service';

describe('FeeCalendarService', () => {
  let service: FeeCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FeeCalendarService
      ]
    });
    service = TestBed.inject(FeeCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
