import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { PublisherCrudService } from './publisher-crud-service';

describe('PublisherCrudService', () => {
  let service: PublisherCrudService;

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
    service = TestBed.inject(PublisherCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
