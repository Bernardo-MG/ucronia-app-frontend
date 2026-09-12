import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { FrontpageService } from './frontpage-service';

describe('FrontpageService', () => {
  let service: FrontpageService;

  const ucroniaClientMock = {
    activity: {
      page: jasmine.createSpy().and.returnValue(of({ content: [], last: true, page: 1 }))
    },
    setting: {
      public: {
        get: jasmine.createSpy().and.returnValue(of({}))
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: ucroniaClientMock }
      ]
    });
    service = TestBed.inject(FrontpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load every activities page with the selected date range', () => {
    const from = new Date('2026-09-12T10:00:00Z');

    service.getActivities(from, undefined).subscribe();

    expect(ucroniaClientMock.activity.page).toHaveBeenCalledWith(1, 100, undefined, from, undefined);
  });
});
