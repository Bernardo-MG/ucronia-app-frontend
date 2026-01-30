import { TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { LibraryService } from './library-service';

describe('LibraryService', () => {
  let service: LibraryService;

  const mockUcroniaClient = {
    library: {
      gameBook: {
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
    },
    fictionBook: {
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
    },
    bookType: {
      page: jasmine.createSpy().and.returnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    },
    gameSystem: {
      page: jasmine.createSpy().and.returnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    },
    author: {
      page: jasmine.createSpy().and.returnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    },
    publisher: {
      page: jasmine.createSpy().and.returnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    },
    memberProfile: {
      page: jasmine.createSpy().and.returnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    },
    lending: {
      lend: jasmine.createSpy().and.returnValue(of({})),
      return: jasmine.createSpy().and.returnValue(of({}))
    }
  };

  const securityClientMock = {
    profile: {
      page: jasmine.createSpy().and.returnValue(of({
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
