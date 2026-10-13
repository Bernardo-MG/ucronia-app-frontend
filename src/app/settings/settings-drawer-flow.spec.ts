import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AuthService } from '@bernardo-mg/authentication';
import { Page } from '@bernardo-mg/request';
import { ConfirmationService } from 'primeng/api';
import { Drawer } from 'primeng/drawer';
import { of, throwError } from 'rxjs';
import { ContactMethodService } from './contact-method-service';
import { ContactMethodView } from './contact-method-view/contact-method-view';
import { FeeTypeService } from './fee-type-service';
import { FeeTypeView } from './fee-type-view/fee-type-view';
import { GameTableService } from './game-table-service';
import { GameTableView } from './game-table-view/game-table-view';
import { KeyService } from './key-service';
import { KeyView } from './key-view/key-view';

type SettingsView = KeyView | FeeTypeView | ContactMethodView | GameTableView;

const cases = [
  { view: KeyView, service: KeyService, form: 'assoc-key-form' },
  { view: FeeTypeView, service: FeeTypeService, form: 'assoc-fee-type-form' },
  { view: ContactMethodView, service: ContactMethodService, form: 'assoc-contact-method-form' },
  { view: GameTableView, service: GameTableService, form: 'assoc-game-table-form' }
];

for (const { view, service, form } of cases) {
  describe(`${view.name} drawer flow`, () => {
    let fixture: ComponentFixture<SettingsView>;
    let allowed: boolean;
    let confirmation: jasmine.SpyObj<ConfirmationService>;
    const item = { number: 7, name: 'Prueba', description: 'Detalle completo', available: false, amount: 12 };
    const page = Object.assign(new Page<typeof item>(), { content: [item], page: 1, size: 10, totalElements: 1 });
    const crud = jasmine.createSpyObj('SettingsService', ['getAll', 'create', 'update', 'delete']);

    beforeEach(async () => {
      allowed = true;
      confirmation = jasmine.createSpyObj<ConfirmationService>('ConfirmationService', ['confirm']);
      crud.delete.calls.reset();
      crud.delete.and.returnValue(of(item));
      crud.getAll.and.returnValue(of(page));
      crud.update.and.returnValue(of(item));
      await TestBed.configureTestingModule({
        imports: [view],
        providers: [
          provideNoopAnimations(),
          provideZonelessChangeDetection(),
          { provide: ConfirmationService, useValue: confirmation },
          { provide: AuthService, useValue: { hasPermission: () => allowed } },
          { provide: service, useValue: crud }
        ]
      }).compileComponents();
    });

    function render(): void {
      fixture = TestBed.createComponent<SettingsView>(view);
      fixture.changeDetectorRef.markForCheck();
      fixture.detectChanges();
    }

    function click(selector: string): void {
      const element = fixture.debugElement.query(By.css(selector));
      expect(element).withContext(selector).not.toBeNull();
      element.nativeElement.click();
      fixture.changeDetectorRef.markForCheck();
      fixture.detectChanges();
    }

    it('opens details from the eye button, edits the selected item, and cancels back to details', () => {
      render();
      expect(fixture.debugElement.query(By.css(form))).toBeNull();
      click('button[aria-label="Ver detalles"]');
      expect(fixture.componentInstance.dialog).toBe(fixture.componentInstance.Dialog.INFO);
      expect(fixture.debugElement.query(By.directive(Drawer)).componentInstance.visible).toBeTrue();
      expect(fixture.nativeElement.textContent).toContain('7');
      expect(fixture.debugElement.query(By.css(form))).toBeNull();
      click('p-button[data-action="edit"] button');
      const editor = fixture.debugElement.query(By.css(form));
      expect(editor.componentInstance.form.value.number).toBe(item.number);
      fixture.componentInstance.onCancelEdit();
      fixture.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      expect(fixture.componentInstance.dialog).toBe(fixture.componentInstance.Dialog.INFO);
      expect(fixture.debugElement.query(By.css(form))).toBeNull();
    });

    it('allows read-only users to see details without offering table mutation actions', () => {
      allowed = false;
      render();
      expect(fixture.debugElement.query(By.css('button[aria-label="Más acciones"]'))).toBeNull();
      click('button[aria-label="Ver detalles"]');
      const edit = fixture.debugElement.query(By.css('p-button[data-action="edit"] button'));
      expect(edit.nativeElement.disabled).toBeTrue();
      expect(fixture.debugElement.query(By.css('button[aria-label="Eliminar"]')).nativeElement.disabled).toBeTrue();
      expect(fixture.componentInstance.dialog).toBe(fixture.componentInstance.Dialog.INFO);
    });

    it('deletes only from the info drawer after confirmation', () => {
      render();
      expect(fixture.nativeElement.querySelector('.pi-trash')).toBeNull();
      expect(fixture.nativeElement.querySelector('.pi-ellipsis-v')).toBeNull();
      click('button[aria-label="Ver detalles"]');
      click('button[aria-label="Eliminar"]');
      expect(confirmation.confirm).toHaveBeenCalledTimes(1);
      expect(crud.delete).not.toHaveBeenCalled();
      expect(fixture.componentInstance.dialog).toBe(fixture.componentInstance.Dialog.INFO);
      confirmation.confirm.calls.mostRecent().args[0].accept?.();
      fixture.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      expect(crud.delete).toHaveBeenCalledOnceWith(item.number);
      expect(fixture.componentInstance.dialog).toBe(fixture.componentInstance.Dialog.NONE);
    });

    it('keeps the edit form open on a failed save and closes after a successful retry', () => {
      render();
      click('button[aria-label="Ver detalles"]');
      click('p-button[data-action="edit"] button');
      crud.update.and.returnValue(throwError(() => new Error('Save failed')));
      fixture.componentInstance.onUpdate(item);
      fixture.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css(form))).not.toBeNull();
      expect(fixture.componentInstance.dialog).toBe(fixture.componentInstance.Dialog.EDIT);
      crud.update.and.returnValue(of(item));
      fixture.componentInstance.onUpdate(item);
      fixture.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      expect(fixture.componentInstance.dialog).toBe(fixture.componentInstance.Dialog.NONE);
      expect(fixture.debugElement.query(By.directive(Drawer)).componentInstance.visible).toBeFalse();
    });
  });
}
