import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { BookTypeService } from './book-type-service';

describe('BookTypeService', () => {
  let service: BookTypeService;

  const mockUcroniaClient = {
    library: {
      bookType: {
        create: vi.fn().mockReturnValue(of({})),
        update: vi.fn().mockReturnValue(of({})),
        get: vi.fn().mockReturnValue(of({})),
        delete: vi.fn().mockReturnValue(of({})),
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
        MessageService,
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });

    service = TestBed.inject(BookTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
