import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginContainer } from './login.container';
import { UserLogin } from '../../models/user-login';

describe('LoginContainer', () => {
  let component: LoginContainer;
  let fixture: ComponentFixture<LoginContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginContainer
      ],
      providers: [
        LoginService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login service when onLogin is triggered', () => {
    const loginService = TestBed.inject(LoginService);
    const spy = spyOn(loginService, 'login').and.returnValue({
      subscribe: (observer: any) => observer.next({ logged: true })
    } as any);

    const login = new UserLogin('username', 'password');
    component.onLogin(login);

    expect(spy).toHaveBeenCalledWith(login, false);
  });

  it('should set waiting to true while login is in progress and false after', () => {
    const loginService = TestBed.inject(LoginService);

    let capturedObserver: any;
    spyOn(loginService, 'login').and.returnValue({
      subscribe: (observer: any) => {
        capturedObserver = observer;
      }
    } as any);

    component.onLogin(new UserLogin('username', 'password'));
    expect(component.waiting).toBeTrue();

    capturedObserver.next({ logged: true });
    expect(component.waiting).toBeFalse();
  });

  describe('login result', () => {

    it('should set failedLogin to true if login fails', () => {
      const loginService = TestBed.inject(LoginService);
      spyOn(loginService, 'login').and.returnValue({
        subscribe: (observer: any) => observer.next({ logged: false })
      } as any);

      component.onLogin(new UserLogin('username', 'password'));

      expect(component.failedLogin).toBeTrue();
    });

    it('should set failedLogin to true on error response', () => {
      const loginService = TestBed.inject(LoginService);
      spyOn(loginService, 'login').and.returnValue({
        subscribe: (_: any) => {
          _.error({});
        }
      } as any);

      component.onLogin(new UserLogin('user', 'pass'));

      expect(component.failedLogin).toBeTrue();
    });

  });

  describe('redirections', () => {

    it('should redirect after successful login', () => {
      const router = TestBed.inject(Router);
      const navigateSpy = spyOn(router, 'navigate');

      const loginService = TestBed.inject(LoginService);
      spyOn(loginService, 'login').and.returnValue({
        subscribe: (observer: any) => observer.next({ logged: true })
      } as any);

      component.onLogin(new UserLogin('user', 'pass'));

      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });

//    it('should redirect after successful login', () => {
//      const returnUrl = '/dashboard';
//      TestBed.overrideProvider(ActivatedRoute, {
//        useValue: {
//          snapshot: {
//            queryParams: {
//              returnUrl: returnUrl
//            }
//          }
//        }
//      }).compileComponents().then(() => {
//        const router = TestBed.inject(Router);
//        const navigateSpy = spyOn(router, 'navigate');
//
//        const loginService = TestBed.inject(LoginService);
//        spyOn(loginService, 'login').and.returnValue({
//          subscribe: (observer: any) => observer.next({ logged: true })
//        } as any);
//
//        component.onLogin(new UserLogin('user', 'pass'));
//
//        expect(navigateSpy).toHaveBeenCalledWith([returnUrl]);
//      });
//    });

  });

});
