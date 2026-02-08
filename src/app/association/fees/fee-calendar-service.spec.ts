import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { FeeCalendarService } from './fee-calendar-service';

describe('FeeCalendarService', () => {
  let service: FeeCalendarService;

  const mockUcroniaClient = {
    fee: {
      year: jasmine.createSpy().and.returnValue(of({})),
      range: jasmine.createSpy().and.returnValue(of({}))
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(FeeCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
