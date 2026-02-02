import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FailureResponse } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { of, throwError } from 'rxjs';
import { PasswordResetService } from '../password-reset-service';
import { PasswordResetView } from './password-reset-view';

describe('PasswordResetView', () => {
  let component: PasswordResetView;
  let fixture: ComponentFixture<PasswordResetView>;

  const mockSecurityClient = {
    password: {
      reset: {
        reset: jasmine.createSpy().and.returnValue(of({})),
        validateToken: jasmine.createSpy().and.returnValue(of({}))
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PasswordResetView
      ],
      providers: [
        PasswordResetService,
        { provide: SecurityClient, useValue: mockSecurityClient },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordResetView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner when validating is true', () => {
    component.status = 'valid_token';
    component.validating = true;
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.pi-spinner');
    expect(spinner).not.toBeNull();
  });

  describe('token validation', () => {

    it('should set token when token is valid', () => {
      const service = TestBed.inject(PasswordResetService);
      spyOn(service, 'validateToken').and.returnValue(of({ content: { valid: true, username: 'username' } }));

      component['validateToken']('token');
      expect(component.status).toBe('valid_token');
    });

    it('should call validateToken with the token from the route', () => {
      const service = TestBed.inject(PasswordResetService);
      const spy = spyOn(service, 'validateToken').and.returnValue(of({ content: { valid: true, username: 'username' } }));

      component['validateToken']('token');

      expect(spy).toHaveBeenCalledWith('token');
    });

    it('should set status to "invalid_token" when token is invalid', () => {
      const service = TestBed.inject(PasswordResetService);
      spyOn(service, 'validateToken').and.returnValue(of({ content: { valid: false, username: 'username' } }));

      component['validateToken']('token');
      expect(component.status).toBe('invalid_token');
    });

    it('should set status to "invalid_token" on validation error', () => {
      const service = TestBed.inject(PasswordResetService);
      spyOn(service, 'validateToken').and.returnValue(throwError(() => new Error('error')));

      component['validateToken']('token');
      expect(component.status).toBe('invalid_token');
    });

  });

  describe('password reset', () => {

    it('should set status to finished on success', () => {
      const service = TestBed.inject(PasswordResetService);
      spyOn(service, 'resetPassword').and.returnValue(of({ content: undefined }));

      component['token'] = 'token';
      component.onPasswordReset('newpassword');

      expect(component.status).toBe('finished');
    });

    it('should call resetPassword with correct token and password', () => {
      const service = TestBed.inject(PasswordResetService);
      const spy = spyOn(service, 'resetPassword').and.returnValue(of({ content: undefined }));

      component['token'] = 'token';
      component.onPasswordReset('password');

      expect(spy).toHaveBeenCalledWith('token', 'password');
    });

    it('should set failures on error with FailureResponse', () => {
      const service = TestBed.inject(PasswordResetService);

      spyOn(service, 'resetPassword').and.returnValue(
        throwError(() => new FailureResponse({ 'field': [{ field: 'password', message: 'too weak' }] }))
      );

      component['token'] = 'token';
      component.onPasswordReset('badpassword');

      expect(component.failures.getFailures('field').length).toBeGreaterThan(0);
    });

    it('should clear failures on unknown error', () => {
      const service = TestBed.inject(PasswordResetService);
      spyOn(service, 'resetPassword').and.returnValue(
        throwError(() => new Error('Unknown'))
      );

      component['token'] = 'token';
      component.onPasswordReset('any');

      expect(Object.keys(component.failures.getAllFailures()).length).toBe(0);
    });

  });

  describe('template rendering', () => {
    it('should show reset form when status is "valid_token"', () => {
      component.status = 'valid_token';
      fixture.detectChanges();

      const form = fixture.nativeElement.querySelector('login-password-reset-form');
      expect(form).not.toBeNull();
    });

    it('should show invalid token message', () => {
      component.status = 'invalid_token';
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('p-card');
      expect(card.textContent).toContain('Token inválido');
    });

    it('should show finished message', () => {
      component.status = 'finished';
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('p-card');
      expect(card.textContent).toContain('Se ha cambiado la contraseña');
    });
  });

});
