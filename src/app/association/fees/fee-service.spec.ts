import { TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { FeeService } from './fee-service';

describe('FeeService', () => {
  let service: FeeService;

  const mockUcroniaClient = {
    fee: {
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

  const securityClientMock = {
    profile: {
      get: vi.fn().mockReturnValue(of({}))
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
    service = TestBed.inject(FeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
