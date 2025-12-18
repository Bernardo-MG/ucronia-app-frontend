import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { LoggedInGuard } from './logged-in.guard';

class AuthServiceStub {
  private _logged = false;

  public get logged(): boolean {
    return this._logged;
  }

  public setLogged(value: boolean): void {
    this._logged = value;
  }
}

describe('LoggedInGuard', () => {
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
    state = { url: '/account' } as RouterStateSnapshot;
  });

  it('should allow access when user is logged in', () => {
    authService.setLogged(true);

    const result = TestBed.runInInjectionContext(() =>
      LoggedInGuard(route, state)
    );

    expect(result).toBe(true);
  });

  it('should redirect to /login with returnUrl when user is not logged in', () => {
    authService.setLogged(false);

    const result = TestBed.runInInjectionContext(() =>
      LoggedInGuard(route, state)
    );

    expect(result instanceof UrlTree).toBeTrue();

    const tree = result as UrlTree;
    expect(router.serializeUrl(tree)).toBe('/login?returnUrl=%2Faccount');
  });

  it('should not redirect when accessing /login', () => {
    authService.setLogged(false);
    state = { url: '/login' } as RouterStateSnapshot;

    const result = TestBed.runInInjectionContext(() =>
      LoggedInGuard(route, state)
    );

    expect(result).toBeTrue();
  });

});
