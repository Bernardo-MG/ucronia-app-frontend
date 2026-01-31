import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { FrontpageService } from './frontpage-service';

describe('FrontpageService', () => {
  let service: FrontpageService;

  const ucroniaClienttMock = {
    setting: {
      public: {
        get: jasmine.createSpy().and.returnValue(of({}))
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: ucroniaClienttMock }
      ]
    });
    service = TestBed.inject(FrontpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
