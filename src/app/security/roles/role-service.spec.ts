import { TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { of } from 'rxjs';
import { RoleService } from './role-service';

describe('RoleService', () => {
  let service: RoleService;

  const securityClientMock = {
    role: {
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SecurityClient, useValue: securityClientMock }
      ]
    });
    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
