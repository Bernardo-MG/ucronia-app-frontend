import { TestBed } from '@angular/core/testing';
import { UserTokenStatus } from '@bernardo-mg/authentication';
import { SecurityClient } from '@bernardo-mg/security';
import { of } from 'rxjs';
import { PasswordResetService } from './password-reset-service';

describe('PasswordResetService', () => {
  let service: PasswordResetService;

  const mockSecurityClient = {
    password: {
      reset: {
        requestReset: jasmine.createSpy().and.returnValue(of({})),
        reset: jasmine.createSpy().and.returnValue(of({})),
        validateToken: jasmine.createSpy().and.returnValue(of({}))
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SecurityClient, useValue: mockSecurityClient }
      ]
    });

    service = TestBed.inject(PasswordResetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('request password reset', () => {

    it('should call requestReset with email payload', () => {
      const email = 'test@example.com';

      service.requestResetPassword(email).subscribe();

      expect(mockSecurityClient.password.reset.requestReset)
        .toHaveBeenCalledWith({ email });
    });

  });

  describe('reset password', () => {

    it('should call reset with token and password payload', () => {
      const token = 'token';
      const password = 'newpass';

      service.resetPassword(token, password).subscribe();

      expect(mockSecurityClient.password.reset.reset)
        .toHaveBeenCalledWith(token, { password });
    });

  });

  describe('validate token', () => {

    it('should call validateToken with token', () => {
      const token = 'token';
      const response = { content: new UserTokenStatus(true, 'username') };

      mockSecurityClient.password.reset.validateToken
        .and.returnValue(of(response));

      service.validateToken(token)
        .subscribe((res) => expect(res).toEqual(response));

      expect(mockSecurityClient.password.reset.validateToken)
        .toHaveBeenCalledWith(token);
    });

  });
});
