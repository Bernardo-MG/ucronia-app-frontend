import { TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { MessageService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { RoleService } from './role-service';

describe('RoleService', () => {
  let service: RoleService;

  const securityClientMock = {
    role: {
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService,
        { provide: SecurityClient, useValue: securityClientMock }
      ]
    });
    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
