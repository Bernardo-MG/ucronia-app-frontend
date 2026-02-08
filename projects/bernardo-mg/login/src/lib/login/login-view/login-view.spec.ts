import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { SecurityDetails } from '@bernardo-mg/authentication';
import { SecurityClient } from '@bernardo-mg/security';
import { NEVER, of, throwError } from 'rxjs';
import { LoginEvent } from '../login-form/login-form';
import { LoginService } from '../login-service';
import { LoginView } from './login-view';

describe('Login', () => {
  let component: LoginView;
  let fixture: ComponentFixture<LoginView>;

  const mockSecurityClient = {
    login: {
      login: jasmine.createSpy().and.returnValue(of({}))
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginView
      ],
      providers: [
        LoginService,
        { provide: SecurityClient, useValue: mockSecurityClient },
        provideRouter([])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login service when onLogin is triggered', () => {
    const service = TestBed.inject(LoginService);
    const spy = spyOn(service, 'login').and.returnValue(
      of(new SecurityDetails(true))
    );

    const login = new LoginEvent('username', 'password');
    component.onLogin(login);

    expect(spy).toHaveBeenCalledWith(login, false);
  });

  describe('waiting', () => {

    it('should set waiting to true while login is in progress', () => {
      const service = TestBed.inject(LoginService);

      spyOn(service, 'login').and.returnValue(NEVER);

      component.onLogin(new LoginEvent('username', 'password'));

      expect(component.waiting).toBeTrue();
    });

    it('should set waiting to false after login', () => {
      const service = TestBed.inject(LoginService);

      spyOn(service, 'login').and.returnValue(
        of(new SecurityDetails(true))
      );

      component.onLogin(new LoginEvent('username', 'password'));

      expect(component.waiting).toBeFalse();
    });

    it('should set waiting to false when there is an error', () => {
      const service = TestBed.inject(LoginService);
      spyOn(service, 'login').and.returnValue(
        throwError(() => new Error('login failed'))
      );

      expect(component.waiting).toBeFalse();
    });

  });

  describe('login result', () => {

    it('should set failedLogin to false if login succeeds', () => {
      const service = TestBed.inject(LoginService);
      spyOn(service, 'login').and.returnValue(
        of(new SecurityDetails(true))
      );

      component.onLogin(new LoginEvent('username', 'password'));

      expect(component.failedLogin).toBeFalse();
    });

    it('should set failedLogin to true if login fails', () => {
      const service = TestBed.inject(LoginService);
      spyOn(service, 'login').and.returnValue(
        of(new SecurityDetails(false))
      );

      component.onLogin(new LoginEvent('username', 'password'));

      expect(component.failedLogin).toBeTrue();
    });

    it('should set failedLogin to true on error response', () => {
      const service = TestBed.inject(LoginService);
      spyOn(service, 'login').and.returnValue(
        throwError(() => new Error('login failed'))
      );

      component.onLogin(new LoginEvent('user', 'pass'));

      expect(component.failedLogin).toBeTrue();
    });

  });

  describe('redirections', () => {

    it('should redirect after successful login', () => {
      const router = TestBed.inject(Router);
      const navigateSpy = spyOn(router, 'navigate');

      const service = TestBed.inject(LoginService);
      spyOn(service, 'login').and.returnValue(
        of(new SecurityDetails(true))
      );

      component.onLogin(new LoginEvent('user', 'pass'));

      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });

  });

});
