import { TestBed } from '@angular/core/testing';
import { User, UserTokenStatus } from '@bernardo-mg/authentication';
import { SimpleResponse } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { of } from 'rxjs';
import { AccessUserActivateService } from './user-activate-service';

describe('AccessUserActivateService', () => {
  let service: AccessUserActivateService;

  const mockSecurityClient = {
    user: {
      onboarding: {
        activate: vi.fn().mockReturnValue(of({ content: {} as User })),
        validateToken: vi.fn().mockReturnValue(of({ content: {} as UserTokenStatus }))
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SecurityClient, useValue: mockSecurityClient }
      ]
    });

    service = TestBed.inject(AccessUserActivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('activate user', () => {

    it('should append token to route', () => {
      const token = 'token';
      const password = 'password';

      service.activateUser(token, password).subscribe();

      expect(mockSecurityClient.user.onboarding.activate)
        .toHaveBeenCalledWith(token, { password });
    });

    it('should call create with Password', async () => {
      const token = 'token';
      const password = 'password';

      const mockResponse = new SimpleResponse<User>(new User());

      mockSecurityClient.user.onboarding.activate.mockReturnValue(of(mockResponse));

      service.activateUser(token, password).subscribe(res => {
        expect(res).toEqual(mockResponse);
        ;
      });
    });

  });

  describe('validate token', () => {

    it('should append token to route', () => {
      const token = 'token';

      service.validateToken(token).subscribe();

      expect(mockSecurityClient.user.onboarding.validateToken)
        .toHaveBeenCalledWith(token);
    });

    it('should call read and return UserTokenStatus', async () => {
      const token = 'token';

      const mockResponse = new SimpleResponse<UserTokenStatus>(new UserTokenStatus(true, 'username'));

      mockSecurityClient.user.onboarding.validateToken.mockReturnValue(of(mockResponse));

      service.validateToken(token).subscribe(res => {
        expect(res).toEqual(mockResponse);
        ;
      });
    });

  });

});
