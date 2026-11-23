import type { Mock } from 'vitest';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AuthService, Role, User } from '@bernardo-mg/authentication';
import { Page } from '@bernardo-mg/request';
import { ConfirmationService } from '@openng/optimus-ui/api';
import { of, Subject } from 'rxjs';
import { Profile } from '@ucronia/domain';
import { RoleService } from './roles/role-service';
import { RoleView } from './roles/role-view/role-view';
import { UserService } from './users/user-service';
import { UserView } from './users/user-view/user-view';

const permission = { name: 'test:read', resource: 'test', action: 'read' };
const role = new Role('Editor', []);
const user = Object.assign(new User(), { username: 'test', name: 'Test', email: 'test@example.com', roles: [] });

for (const type of [RoleView, UserView]) {
  describe(`${type.name} editing footer`, () => {
    const isRole = type === RoleView;
    let pending: Subject<unknown>;
    let update: Mock;
    let choices: Subject<typeof role[] | typeof permission[]>;

    beforeEach(() => {
      pending = new Subject();
      choices = new Subject();
      update = vi.fn().mockName('update').mockReturnValue(pending);
      TestBed.configureTestingModule({
        imports: [type],
        providers: [provideZonelessChangeDetection(), provideNoopAnimations(),
          { provide: AuthService, useValue: { hasPermission: () => true } },
          { provide: ConfirmationService, useValue: {} },
          { provide: isRole ? RoleService : UserService, useValue: {
            getAll: () => of(Object.assign(new Page(), { content: [], totalElements: 0 })),
            getAllPermissions: () => choices,
            getAllRoles: () => choices,
            getProfile: () => of(new Profile()),
            update
          } }
        ]
      });
    });

    it('updates the fixed footer after a selection change and disables it while saving', async () => {
      const fixture = isRole ? TestBed.createComponent(RoleView) : TestBed.createComponent(UserView);
      fixture.detectChanges();
      const view = fixture.componentInstance;
      if (view instanceof RoleView) view.onShowInfo(role);
      else view.onShowUser(user);
      fixture.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      await fixture.whenStable();
      const info: HTMLElement = fixture.debugElement.query(By.css(isRole ? 'access-role-info' : 'access-user-info')).nativeElement.closest('.p-drawer')!;
      info.querySelector<HTMLButtonElement>('[data-action="edit"] button')!.click();
      await fixture.whenStable();
      choices.next(isRole ? [permission] : [role]);
      choices.complete();
      // A normal parent check must also refresh the OnPush drawer's projected slots.
      fixture.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      await fixture.whenStable();
      const form = document.querySelector(`form#${isRole ? 'role-view-permissions' : 'user-view-edit'}`)!;
      const drawer = form.closest('.p-drawer')!;
      const footer = drawer.querySelector('[data-pc-section="footer"]')!;
      const submit = footer.querySelector<HTMLButtonElement>('[data-action="submit"]')!;
      expect(submit,'one fixed footer submit button').not.toBeNull();
      expect(form.querySelector('[data-action="submit"]')).toBeNull();
      expect(submit.disabled).toBe(true);
      const checkboxes = form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
      const checkbox = checkboxes[checkboxes.length - 1];
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      await fixture.whenStable();
      expect(submit.disabled,'selection must enable the projected footer').toBe(false);
      submit.click();
      await fixture.whenStable();
      expect(update).toHaveBeenCalledTimes(1);
      expect(submit.disabled).toBe(true);
      expect(form.querySelector<HTMLFieldSetElement>('fieldset')!.disabled).toBe(true);
      expect(footer.querySelector<HTMLButtonElement>('[data-action="cancel"]')!.disabled).toBe(true);
      pending.error(new Error('Retry'));
      await fixture.whenStable();
      expect(submit.disabled,'failed save allows retry').toBe(false);
      footer.querySelector<HTMLButtonElement>('[data-action="cancel"]')!.click();
      await fixture.whenStable();
      expect(view.dialog).toBe(view.Dialog.INFO);
      expect(drawer.querySelector('[data-action="edit"] button')).not.toBeNull();
    });
  });
}
