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

  it('should call password reset with token and password payload', () => {
    const token = 'token';
    const password = 'newpass';

    service.resetPassword(token, password).subscribe();

    expect(mockSecurityClient.password.reset.reset)
      .toHaveBeenCalledWith(token, { password });
  });

  it('should call validateToken with token', () => {
    const token = 'token';
    const status = new UserTokenStatus(true, 'username');

    mockSecurityClient.password.reset.validateToken
      .and.returnValue(of(status));

    service.validateToken(token)
      .subscribe((res) => expect(res).toEqual(status));

    expect(mockSecurityClient.password.reset.validateToken)
      .toHaveBeenCalledWith(token);
  });

});
