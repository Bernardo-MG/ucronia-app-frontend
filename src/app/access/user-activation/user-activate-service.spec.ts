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
        activate: jasmine.createSpy().and.returnValue(of({ content: {} as User })),
        validateToken: jasmine.createSpy().and.returnValue(of({ content: {} as UserTokenStatus }))
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

    it('should call create with Password', (done) => {
      const token = 'token';
      const password = 'password';

      const mockResponse = new SimpleResponse<User>(new User());

      mockSecurityClient.user.onboarding.activate.and.returnValue(of(mockResponse));

      service.activateUser(token, password).subscribe(res => {
        expect(res).toEqual(mockResponse);
        done();
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

    it('should call read and return UserTokenStatus', (done) => {
      const token = 'token';

      const mockResponse = new SimpleResponse<UserTokenStatus>(new UserTokenStatus(true, 'username'));

      mockSecurityClient.user.onboarding.validateToken.and.returnValue(of(mockResponse));

      service.validateToken(token).subscribe(res => {
        expect(res).toEqual(mockResponse);
        done();
      });
    });

  });

});
