import { provideZonelessChangeDetection, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ActivityForm } from '@app/association/activities/activity-form/activity-form';
import { ProfileCreationForm } from '@app/association/directory/profile-creation-form/profile-creation-form';
import { ProfileEditionForm } from '@app/association/directory/profile-edition-form/profile-edition-form';
import { FeeCreationForm } from '@app/association/fees/fee-creation-form/fee-creation-form';
import { FeeEditionForm } from '@app/association/fees/fee-edition-form/fee-edition-form';
import { FeePaymentsForm } from '@app/association/fees/fee-payments-form/fee-payments-form';
import { FileForm } from '@app/association/files/file-form/file-form';
import { TransactionForm } from '@app/association/funds/transaction-form/transaction-form';
import { ImageForm } from '@app/association/images/image-form/image-form';
import { ImageService } from '@app/association/images/image-service';
import { LibraryBookCreationForm } from '@app/association/library/library-book-creation-form/library-book-creation-form';
import { LibraryBookEditionForm } from '@app/association/library/library-book-edition-form/library-book-edition-form';
import { LibraryBookLendingForm } from '@app/association/library/library-book-lending-form/library-book-lending-form';
import { LibraryBookReturnForm } from '@app/association/library/library-book-return-form/library-book-return-form';
import { LibraryConfig } from '@app/association/library/library-config';
import { LibraryService } from '@app/association/library/library-service';
import { ScheduledGameForm } from '@app/association/scheduled-game/scheduled-game-form/scheduled-game-form';
import { RoleForm } from '@app/security/roles/role-form/role-form';
import { UserTokenExtendForm } from '@app/security/user-tokens/user-token-extend-form/user-token-extend-form';
import { UserForm } from '@app/security/users/user-form/user-form';
import { ContactMethodForm } from '@app/settings/contact-method-form/contact-method-form';
import { FeeTypeForm } from '@app/settings/fee-type-form/fee-type-form';
import { GameTableForm } from '@app/settings/game-table-form/game-table-form';
import { KeyForm } from '@app/settings/key-form/key-form';
import { NameForm } from '@app/shared/data/name-form/name-form';

const forms = [ActivityForm, ProfileCreationForm, ProfileEditionForm, FeeCreationForm,
  FeeEditionForm, FeePaymentsForm, FileForm, TransactionForm, ImageForm,
  LibraryBookCreationForm, LibraryBookEditionForm, LibraryBookLendingForm,
  LibraryBookReturnForm, ScheduledGameForm, RoleForm, UserTokenExtendForm,
  UserForm, ContactMethodForm, FeeTypeForm, GameTableForm, NameForm, KeyForm];

type DrawerForm = InstanceType<typeof forms[number]>;

function fill(control: AbstractControl, name = ''): void {
  if (control instanceof FormGroup) {
    Object.entries(control.controls).forEach(([key, child]) => fill(child, key));
  } else if (control instanceof FormArray) {
    if (!control.length && control.hasValidator(Validators.required)) {
      control.push(new FormControl(new Date(), Validators.required));
    }
    control.controls.forEach(child => fill(child, name));
  } else if (control.invalid) {
    const value = /date|day|hour|month|start/i.test(name) ? new Date()
      : /member|borrower|book|number|amount|players|interval/i.test(name) ? 1
      : name === 'email' ? 'test@example.com' : 'Test';
    control.setValue(value);
  }
}

for (const formType of forms) {
  describe(`${formType.name} submission safeguards`, () => {
    let fixture: ComponentFixture<DrawerForm>;
    let component: DrawerForm;
    let emitted: jasmine.Spy;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [formType],
        providers: [provideZonelessChangeDetection(), provideNoopAnimations(),
          { provide: ImageService, useValue: { getAllForSelection: () => of([]) } },
          { provide: LibraryConfig, useValue: { getLanguages: () => [] } },
          { provide: LibraryService, useValue: {
            getGameSystems: () => of({ content: [], last: true }),
            getBookTypes: () => of({ content: [], last: true })
          } }
        ]
      });
      fixture = TestBed.createComponent(formType as Type<DrawerForm>);
      component = fixture.componentInstance;
      emitted = spyOn(component.save, 'emit');
      fill(component.form);
      if (component instanceof FileForm || component instanceof ImageForm) {
        component.file = new File(['content'], 'example.txt');
      }
      component.form.markAsDirty();
    });

    it('blocks native submission while loading and restores eligibility afterwards', () => {
      expect(component.saveEnabled).toBeTrue();
      fixture.componentRef.setInput('loading', true);
      component.onSave();
      expect(emitted).not.toHaveBeenCalled();
      expect(component.form.disabled).toBeTrue();
      fixture.componentRef.setInput('loading', false);
      expect(component.saveEnabled).toBeTrue();
    });

    it('marks an invalid submission touched without emitting', () => {
      component.form.setErrors({ invalid: true });
      component.onSave();
      expect(component.form.touched).toBeTrue();
      expect(emitted).not.toHaveBeenCalled();
    });
  });
}
