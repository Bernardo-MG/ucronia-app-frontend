import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { LibraryLendingService } from './library-lending-service';
import { Page, Sorting } from '@bernardo-mg/request';
import { BookLending } from '@ucronia/domain';

describe('LibraryLendingService', () => {
  let service: LibraryLendingService;

  const mockUcroniaClient = {
    library: {
      lending: {
        page: vi.fn().mockReturnValue(of({
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

describe('BookLending server pagination', () => {
  it('preserves the server page and totals', () => {
    const result = Object.assign(new Page<BookLending>(), { content: [new BookLending()], totalElements: 35 });
    const page = vi.fn().mockReturnValue(of(result));
    TestBed.configureTestingModule({ providers: [
      { provide: UcroniaClient, useValue: { library: { lending: { page } } } }
    ] });
    const sort = new Sorting();
    TestBed.inject(LibraryLendingService).getAll(2, sort).subscribe(response => expect(response).toBe(result));
    expect(page).toHaveBeenCalledTimes(1);
    expect(page).toHaveBeenCalledWith(2, undefined, sort);
  });
});
