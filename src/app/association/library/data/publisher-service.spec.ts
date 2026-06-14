import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { PublisherService } from './publisher-service';

describe('PublisherService', () => {
  let service: PublisherService;

  const mockUcroniaClient = {
    library: {
      publisher: {
        create: jasmine.createSpy().and.returnValue(of({})),
        update: jasmine.createSpy().and.returnValue(of({})),
        get: jasmine.createSpy().and.returnValue(of({})),
        delete: jasmine.createSpy().and.returnValue(of({})),
        page: jasmine.createSpy().and.returnValue(of({
          content: [],
          page: 0,
          size: 10,
          totalElements: 0,
          totalPages: 0
        }))
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(PublisherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
