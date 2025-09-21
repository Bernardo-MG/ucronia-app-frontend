import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FailureResponse } from '@bernardo-mg/request';
import { of, throwError } from 'rxjs';
import { AccessUserActivateService } from '../user-activate-service';
import { UserActivation } from './user-activation.container';

describe('UserActivation', () => {
  let component: UserActivation;
  let fixture: ComponentFixture<UserActivation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserActivation
      ],
      providers: [
        AccessUserActivateService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserActivation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('token validation', () => {

    it('should load username on successful token validation', () => {
      const service = TestBed.inject(AccessUserActivateService);
      spyOn(service, 'validateToken').and.returnValue(
        of({ content: { valid: true, username: 'testuser' } })
      );

      component['validateToken']('token');

      expect(component.username).toBe('testuser');
    });

    it('should set status to valid_token on successful token validation', () => {
      const service = TestBed.inject(AccessUserActivateService);
      spyOn(service, 'validateToken').and.returnValue(
        of({ content: { valid: true, username: 'testuser' } })
      );

      component['validateToken']('token');

      expect(component.status).toBe('valid_token');
    });

    it('should set status to invalid_token on failed token validation', () => {
      const service = TestBed.inject(AccessUserActivateService);
      spyOn(service, 'validateToken').and.returnValue(
        of({ content: { valid: false, username: '' } })
      );

      component['validateToken']('token');

      expect(component.status).toBe('invalid_token');
    });

    it('should set status to invalid_token on token validation error', () => {
      const service = TestBed.inject(AccessUserActivateService);
      spyOn(service, 'validateToken').and.returnValue(throwError(() => new Error('Error')));

      component['validateToken']('token');

      expect(component.status).toBe('invalid_token');
    });

  });

  describe('user activation', () => {

    it('should set status to finished on successful activation', () => {
      const service = TestBed.inject(AccessUserActivateService);
      spyOn(service, 'activateUser').and.returnValue(of({ content: undefined }));

      component['token'] = 'token';
      component.onActivateUser('password');

      expect(component.status).toBe('finished');
      expect(component.waiting).toBeFalse();
    });

    it('should store failures on activation error with FailureResponse', () => {
      const service = TestBed.inject(AccessUserActivateService);
      const failureResponse = new FailureResponse({ 'field': [{ field: 'password', message: 'Invalid password' }] });

      spyOn(service, 'activateUser').and.returnValue(throwError(() => failureResponse));

      component['token'] = 'token';
      component.onActivateUser('password');

      expect(component.failures.getFailures('field').length).toBeGreaterThan(0);
    });

    it('should clear failures on activation error that is not FailureResponse', () => {
      const service = TestBed.inject(AccessUserActivateService);
      spyOn(service, 'activateUser').and.returnValue(throwError(() => new Error('Generic error')));

      component['token'] = 'test-token';
      component.onActivateUser('badPassword');

      expect(Object.keys(component.failures.getAllFailures()).length).toBe(0);
    });

  });

});
