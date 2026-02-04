import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { SecurityDetails } from '@bernardo-mg/authentication';
import { LoginRequest, SecurityClient } from '@bernardo-mg/security';
import { Observable, Observer, of, throwError } from 'rxjs';
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
    const loginService = TestBed.inject(LoginService);
    const spy = spyOn(loginService, 'login').and.returnValue(
      of(new SecurityDetails(true))
    );

    const login = new LoginRequest('username', 'password');
    component.onLogin(login);

    expect(spy).toHaveBeenCalledWith(login, false);
  });

  describe('waiting', () => {

    it('should set waiting to true while login is in progress and false after', () => {
      const loginService = TestBed.inject(LoginService);

      let capturedObserver!: Observer<SecurityDetails>;
      spyOn(loginService, 'login').and.returnValue(
        new Observable<SecurityDetails>(observer => {
          capturedObserver = observer;
        })
      );

      component.onLogin(new LoginRequest('username', 'password'));
      expect(component.waiting).toBeTrue();

      capturedObserver.next(new SecurityDetails(true));
      expect(component.waiting).toBeFalse();
    });

    it('should set waiting to false when there is an error', () => {
      const loginService = TestBed.inject(LoginService);
      spyOn(loginService, 'login').and.returnValue(
        throwError(() => new Error('login failed'))
      );

      expect(component.waiting).toBeFalse();
    });

  });

  describe('login result', () => {

    it('should set failedLogin to false if login succeeds', () => {
      const loginService = TestBed.inject(LoginService);
      spyOn(loginService, 'login').and.returnValue(
        of(new SecurityDetails(true))
      );

      component.onLogin(new LoginRequest('username', 'password'));

      expect(component.failedLogin).toBeFalse();
    });

    it('should set failedLogin to true if login fails', () => {
      const loginService = TestBed.inject(LoginService);
      spyOn(loginService, 'login').and.returnValue(
        of(new SecurityDetails(false))
      );

      component.onLogin(new LoginRequest('username', 'password'));

      expect(component.failedLogin).toBeTrue();
    });

    it('should set failedLogin to true on error response', () => {
      const loginService = TestBed.inject(LoginService);
      spyOn(loginService, 'login').and.returnValue(
        throwError(() => new Error('login failed'))
      );

      component.onLogin(new LoginRequest('user', 'pass'));

      expect(component.failedLogin).toBeTrue();
    });

  });

  describe('redirections', () => {

    it('should redirect after successful login', () => {
      const router = TestBed.inject(Router);
      const navigateSpy = spyOn(router, 'navigate');

      const loginService = TestBed.inject(LoginService);
      spyOn(loginService, 'login').and.returnValue(
        of(new SecurityDetails(true))
      );

      component.onLogin(new LoginRequest('user', 'pass'));

      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });

  });

});
