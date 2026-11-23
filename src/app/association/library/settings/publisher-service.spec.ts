import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { PublisherService } from './publisher-service';

describe('PublisherService', () => {
  let service: PublisherService;

  const mockUcroniaClient = {
    library: {
      publisher: {
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
    service = TestBed.inject(PublisherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
