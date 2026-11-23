import type { MockedObject } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { settingsPermissions } from './settings-permissions';
import { SettingsGuard } from './settings.guard';

describe('SettingsGuard', () => {
  let authService: MockedObject<Pick<AuthService, 'hasAnyPermission'>>;
  let router: Router;

  const runGuard = () => TestBed.runInInjectionContext(() =>
    SettingsGuard(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    )
  );

  beforeEach(() => {
    authService = {
      hasAnyPermission: vi.fn(

    ).mockName("AuthService.hasAnyPermission")
  };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    });

    router = TestBed.inject(Router);
  });

  it('does not grant settings access through member profile or key read permission', () => {
    authService.hasAnyPermission.mockImplementation(permissions => permissions.some(permission =>
      permission === UcroniaPermissions.directory.memberProfile.read || permission === UcroniaPermissions.key.read
    ));

    expect(runGuard()).toEqual(router.createUrlTree(['/']));
  });

  it('allows access when the user has a settings permission', () => {
    authService.hasAnyPermission.mockReturnValue(true);

    expect(runGuard()).toBe(true);
    expect(authService.hasAnyPermission)
      .toHaveBeenCalledTimes(1);
      expect(authService.hasAnyPermission).toHaveBeenCalledWith(settingsPermissions);
  });

  it('redirects to root when the user has no settings permissions', () => {
    authService.hasAnyPermission.mockReturnValue(false);

    expect(runGuard()).toEqual(router.createUrlTree(['/']));
    expect(authService.hasAnyPermission)
      .toHaveBeenCalledTimes(1);
      expect(authService.hasAnyPermission).toHaveBeenCalledWith(settingsPermissions);
  });
});