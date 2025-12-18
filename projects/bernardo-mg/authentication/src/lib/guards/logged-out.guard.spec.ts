import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { LoggedOutGuard } from './logged-out.guard';

class AuthServiceStub {
  private _logged = false;

  get logged(): boolean {
    return this._logged;
  }

  setLogged(value: boolean): void {
    this._logged = value;
  }
}

describe('LoggedOutGuard', () => {
  let router: Router;
  let authService: AuthServiceStub;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    });

    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService) as unknown as AuthServiceStub;

    route = new ActivatedRouteSnapshot();
  });

  it('should allow access when accessing root even if logged out', () => {
    authService.setLogged(false);
    state = { url: '/' } as RouterStateSnapshot;

    const result = TestBed.runInInjectionContext(() =>
      LoggedOutGuard(route, state)
    );

    expect(result).toBe(true);
  });

  it('should allow access for logged-out user on non-root routes', () => {
    authService.setLogged(false);
    state = { url: '/login' } as RouterStateSnapshot;

    const result = TestBed.runInInjectionContext(() =>
      LoggedOutGuard(route, state)
    );

    expect(result).toBe(true);
  });

  it('should redirect logged-in user on non-root routes to root', () => {
    authService.setLogged(true);
    state = { url: '/login' } as RouterStateSnapshot;

    const result = TestBed.runInInjectionContext(() =>
      LoggedOutGuard(route, state)
    );

    expect(result instanceof UrlTree).toBeTrue();
    expect(router.serializeUrl(result as UrlTree)).toBe('/');
  });

  it('should allow logged-in user to access root', () => {
    authService.setLogged(true);
    state = { url: '/' } as RouterStateSnapshot;

    const result = TestBed.runInInjectionContext(() =>
      LoggedOutGuard(route, state)
    );

    expect(result).toBe(true);
  });
});
