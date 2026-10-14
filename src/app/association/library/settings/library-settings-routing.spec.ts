import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RedirectFunction, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { settingsPermissions } from '@app/settings/settings-permissions';
import { settingsRoutes } from '@app/settings/settings.routes';
import { libraryRoutes } from '../library.routes';
import { librarySettingsPermissions } from './library-settings-permissions';
import { LibrarySettingsGuard } from './library-settings.guard';

describe('Library settings routing', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  const settingsRoute = libraryRoutes[0].children!.find(route => route.path === 'settings')!;
  const runGuard = () => TestBed.runInInjectionContext(() => LibrarySettingsGuard(
    {} as ActivatedRouteSnapshot, {} as RouterStateSnapshot
  ));

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['hasPermission', 'hasAnyPermission']);
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authService }]
    });
    router = TestBed.inject(Router);
  });

  it('allows catalog administrators without requiring book access', () => {
    authService.hasAnyPermission.and.returnValue(true);
    expect(runGuard()).toBeTrue();
    expect(authService.hasAnyPermission).toHaveBeenCalledOnceWith(librarySettingsPermissions);
    expect(libraryRoutes[0].canActivate).toBeUndefined();
    expect(libraryRoutes[0].children!.find(route => route.path === 'books')!.children![0].canActivate).toBeDefined();
  });

  it('rejects users without any library settings permission', () => {
    authService.hasAnyPermission.and.returnValue(false);
    expect(runGuard()).toEqual(router.createUrlTree(['/']));
  });

  it('redirects to the first readable catalog', () => {
    authService.hasPermission.and.callFake(permission => permission === UcroniaPermissions.library.publisher.read);
    const redirect = settingsRoute.children![0].redirectTo as RedirectFunction;
    const result = TestBed.runInInjectionContext(() => redirect({} as Parameters<RedirectFunction>[0]));
    expect(result).toBe('/association/library/settings/publisher');
  });

  it('guards each individual catalog', () => {
    authService.hasPermission.and.callFake(permission => permission === UcroniaPermissions.library.publisher.read);
    const catalogs = settingsRoute.children!.filter(route => route.path !== '');
    for (const route of catalogs) {
      const guard = route.canActivate![0] as () => boolean | ReturnType<Router['createUrlTree']>;
      const result = TestBed.runInInjectionContext(guard);
      expect(result).toEqual(route.path === 'publisher' ? true : router.createUrlTree(['/']));
    }
  });

  it('removes library catalogs and permissions from generic settings', () => {
    expect(settingsRoutes[0].children!.some(route => route.path === 'library')).toBeFalse();
    for (const permission of librarySettingsPermissions) {
      expect(settingsPermissions).not.toContain(permission);
    }
  });
});
