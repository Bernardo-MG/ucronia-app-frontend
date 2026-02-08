import { TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { FeeService } from './fee-service';

describe('FeeService', () => {
  let service: FeeService;

  const mockUcroniaClient = {
    fee: {
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
  };

  const securityClientMock = {
    profile: {
      get: jasmine.createSpy().and.returnValue(of({}))
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SecurityClient, useValue: securityClientMock },
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(FeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
