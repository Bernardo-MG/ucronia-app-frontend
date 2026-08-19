import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { Permission } from '../models/permission';
import { AuthService } from '../services/auth-service';
import { ResourceGuard } from './resource.guard';

class AuthServiceStub {
  private permissions: Record<string, string[]> = {};

  setPermission(resource: string, actions: string[]): void {
    this.permissions[resource] = actions;
  }

  hasPermission(permission: Permission): boolean {
    return (
      this.permissions[permission.resource]?.includes(permission.action) ?? false
    );
  }
}

describe('ResourceGuard', () => {
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
    state = { url: '/some-route' } as RouterStateSnapshot;
  });

  it('should allow access when user has the required permission', () => {
    authService.setPermission('MEMBER', ['READ']);

    const guardFn = ResourceGuard({ resource: 'MEMBER', action: 'READ' });
    const result = TestBed.runInInjectionContext(() => guardFn());

    expect(result).toBe(true);
  });

  it('should redirect to root when user lacks the required permission', () => {
    authService.setPermission('MEMBER', ['edit']);

    const guardFn = ResourceGuard({ resource: 'MEMBER', action: 'READ' });
    const result = TestBed.runInInjectionContext(() => guardFn());

    expect(result instanceof UrlTree).toBeTrue();
    expect(router.serializeUrl(result as UrlTree)).toBe('/');
  });

  it('should redirect to root when user has no permissions at all', () => {
    const guardFn = ResourceGuard({ resource: 'MEMBER', action: 'READ' });
    const result = TestBed.runInInjectionContext(() => guardFn());

    expect(result instanceof UrlTree).toBeTrue();
    expect(router.serializeUrl(result as UrlTree)).toBe('/');
  });
});
