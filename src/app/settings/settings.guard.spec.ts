import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { settingsPermissions } from './settings-permissions';
import { SettingsGuard } from './settings.guard';

describe('SettingsGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  const runGuard = () => TestBed.runInInjectionContext(() =>
    SettingsGuard(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    )
  );

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>(
      'AuthService',
      ['hasAnyPermission']
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    });

    router = TestBed.inject(Router);
  });

  it('allows access when the user has a settings permission', () => {
    authService.hasAnyPermission.and.returnValue(true);

    expect(runGuard()).toBeTrue();
    expect(authService.hasAnyPermission)
      .toHaveBeenCalledOnceWith(settingsPermissions);
  });

  it('redirects to root when the user has no settings permissions', () => {
    authService.hasAnyPermission.and.returnValue(false);

    expect(runGuard()).toEqual(router.createUrlTree(['/']));
    expect(authService.hasAnyPermission)
      .toHaveBeenCalledOnceWith(settingsPermissions);
  });
});