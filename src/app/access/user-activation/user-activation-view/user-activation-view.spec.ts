import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap, provideRouter } from '@angular/router';
import { User } from '@bernardo-mg/authentication';
import { FailureResponse } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { of, Subject, throwError } from 'rxjs';
import { AccessUserActivateService } from '../user-activate-service';
import { UserActivationView, Step } from './user-activation-view';

describe('UserActivationView', () => {
  let component: UserActivationView;
  let fixture: ComponentFixture<UserActivationView>;

  let routeParams: Subject<ParamMap>;

  const mockSecurityClient = {
    user: {
      onboarding: {
        activate: jasmine.createSpy().and.returnValue(of({})),
        validateToken: jasmine.createSpy().and.returnValue(of({}))
      }
    }
  };

  beforeEach(async () => {
    routeParams = new Subject<ParamMap>();
    await TestBed.configureTestingModule({
      imports: [
        UserActivationView
      ],
      providers: [
        AccessUserActivateService,
        { provide: SecurityClient, useValue: mockSecurityClient },
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { paramMap: routeParams } }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserActivationView);
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

      routeParams.next(convertToParamMap({ token: 'token' }));

      expect(component.user.username).toBe('testuser');
    });

    it('should set status to valid_token on successful token validation', () => {
      const service = TestBed.inject(AccessUserActivateService);
      spyOn(service, 'validateToken').and.returnValue(
        of({ content: { valid: true, username: 'testuser' } })
      );

      routeParams.next(convertToParamMap({ token: 'token' }));

      expect(component.step).toBe(Step.VALID_TOKEN);
    });

    it('should set status to invalid_token on failed token validation', () => {
      const service = TestBed.inject(AccessUserActivateService);
      spyOn(service, 'validateToken').and.returnValue(
        of({ content: { valid: false, username: '' } })
      );

      routeParams.next(convertToParamMap({ token: 'token' }));

      expect(component.step).toBe(Step.INVALID_TOKEN);
    });

    it('should set status to invalid_token on token validation error', () => {
      const service = TestBed.inject(AccessUserActivateService);
      spyOn(service, 'validateToken').and.returnValue(throwError(() => new Error('Error')));

      routeParams.next(convertToParamMap({ token: 'token' }));

      expect(component.step).toBe(Step.INVALID_TOKEN);
    });

  });

  describe('user activation', () => {

    it('should set status to finished on successful activation', () => {
      const service = TestBed.inject(AccessUserActivateService);
      spyOn(service, 'activateUser').and.returnValue(of({ content: new User() }));

      component.user.token = 'token';
      component.onActivateUser('password');

      expect(component.step).toBe(Step.FINISHED);
      expect(component.status.loading).toBeFalse();
    });

    it('should store failures on activation error with FailureResponse', () => {
      const service = TestBed.inject(AccessUserActivateService);
      const failureResponse = new FailureResponse({ 'field': [{ field: 'password', message: 'Invalid password' }] });

      spyOn(service, 'activateUser').and.returnValue(throwError(() => failureResponse));

      component.user.token = 'token';
      component.onActivateUser('password');

      expect(component.failures.getFailures('field').length).toBeGreaterThan(0);
    });

    it('should clear failures on activation error that is not FailureResponse', () => {
      const service = TestBed.inject(AccessUserActivateService);
      spyOn(service, 'activateUser').and.returnValue(throwError(() => new Error('Generic error')));

      component.user.token = 'test-token';
      component.onActivateUser('badPassword');

      expect(Object.keys(component.failures.getAllFailures()).length).toBe(0);
    });

  });

});
