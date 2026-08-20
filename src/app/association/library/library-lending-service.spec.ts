import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { LibraryLendingService } from './library-lending-service';

describe('LibraryLendingService', () => {
  let service: LibraryLendingService;

  const mockUcroniaClient = {
    library: {
      lending: {
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
    service = TestBed.inject(LibraryLendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
