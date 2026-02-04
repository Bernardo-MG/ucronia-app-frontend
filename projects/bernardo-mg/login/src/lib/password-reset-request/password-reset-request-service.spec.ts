import { TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { of } from 'rxjs';
import { PasswordResetRequestService } from './password-reset-request-service';

describe('PasswordResetRequestService', () => {
  let service: PasswordResetRequestService;

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

    service = TestBed.inject(PasswordResetRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call requestReset with email payload', () => {
    const email = 'test@example.com';

    service.requestPasswordReset(email).subscribe();

    expect(mockSecurityClient.password.reset.requestReset)
      .toHaveBeenCalledWith({ email });
  });

});
