import { TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { MessageService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { UserTokenService } from './user-token-service';

describe('UserTokenService', () => {
  let service: UserTokenService;

  const securityClientMock = {
    userToken: {
      patch: vi.fn().mockReturnValue(of({})),
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
    service = TestBed.inject(UserTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
