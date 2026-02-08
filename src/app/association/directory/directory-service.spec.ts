import { TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { DirectoryService } from './directory-service';

describe('DirectoryService', () => {
  let service: DirectoryService;

  const mockUcroniaClient = {
    library: {
      guest: {
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
        MessageService,
        { provide: SecurityClient, useValue: securityClientMock },
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(DirectoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
