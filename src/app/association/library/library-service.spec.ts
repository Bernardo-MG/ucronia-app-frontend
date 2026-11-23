import { TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { LibraryService } from './library-service';
import { Page, Sorting } from '@bernardo-mg/request';
import { Profile } from '@ucronia/domain';

describe('LibraryService', () => {
  let service: LibraryService;

  const mockUcroniaClient = {
    library: {
      gameBook: {
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
    },
    fictionBook: {
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
    },
    bookType: {
      page: vi.fn().mockReturnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    },
    gameSystem: {
      page: vi.fn().mockReturnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    },
    author: {
      page: vi.fn().mockReturnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    },
    publisher: {
      page: vi.fn().mockReturnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    },
    member: {
      page: vi.fn().mockReturnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    },
    lending: {
      lend: vi.fn().mockReturnValue(of({})),
      return: vi.fn().mockReturnValue(of({}))
    }
  };

  const securityClientMock = {
    profile: {
      page: vi.fn().mockReturnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService,
        { provide: SecurityClient, useValue: securityClientMock },
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });

    service = TestBed.inject(LibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('library-service backend results', () => {
  it('forwards donor search to the backend and preserves its response', () => {
    const profiles = [Object.assign(new Profile(), { number: 1 }), Object.assign(new Profile(), { number: 2 })];
    const page = vi.fn().mockReturnValue(of(Object.assign(new Page<Profile>(), { content: profiles })));
    TestBed.configureTestingModule({ providers: [MessageService,
      { provide: UcroniaClient, useValue: { profile: { page } } }
    ] });
    TestBed.inject(LibraryService).searchDonors('Ana').subscribe(results => expect(results).toBe(profiles));
    expect(page).toHaveBeenCalledTimes(1);
    expect(page).toHaveBeenCalledWith(undefined, 10, expect.any(Sorting), 'Ana');
  });
});
