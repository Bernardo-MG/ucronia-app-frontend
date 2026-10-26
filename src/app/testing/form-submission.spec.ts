import { provideZonelessChangeDetection, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ActivityForm } from '@app/association/activities/activity-form/activity-form';
import { MemberCreationForm } from '@app/association/members/member-creation-form/member-creation-form';
import { MemberKeyForm } from '@app/association/members/member-key-form/member-key-form';
import { MemberEditionForm } from '@app/association/members/member-edition-form/member-edition-form';
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
import { NameForm } from '@app/shared/data/name-form/name-form';

import { RoleChangePermission } from '@app/security/roles/role-change-permission/role-change-permission';

const date = new Date(2026, 0, 15, 12);
const permission = { name: 'book:read', resource: 'book', action: 'read' };
const cases = [
  { type: MemberCreationForm, values: { feeType: 3, name: { firstName: 'Ana', nickname: '', lastName: 'López' } }, invalid: 'feeType', expected: jasmine.objectContaining({ feeType: 3, name: { firstName: 'Ana', nickname: '', lastName: 'López' }, active: true, renew: true, contactChannels: [] }) },
  { type: MemberEditionForm, values: { feeType: 3, name: { firstName: 'Ana', nickname: '', lastName: 'López' }, active: false, renew: false }, invalid: 'feeType', expected: { feeType: 3, name: { firstName: 'Ana', nickname: '', lastName: 'López' }, identifier: '', birthDate: undefined, address: '', comments: '', active: false, renew: false, contactChannels: [] } },
  { type: ActivityForm, values: { title: 'Club meeting', dates: [{ day: date, startHour: date, endHour: date }] }, invalid: 'title', expected: jasmine.objectContaining({ title: 'Club meeting', dates: [{ start: date, end: date }] }) },
  { type: ProfileCreationForm, values: { name: { firstName: 'Ana', nickname: 'An', lastName: 'López' } }, invalid: 'name.firstName', expected: jasmine.objectContaining({ name: { firstName: 'Ana', nickname: 'An', lastName: 'López' } }) },
  { type: ProfileEditionForm, values: { name: { firstName: 'Ana', nickname: '', lastName: 'López' } }, invalid: 'name.firstName', expected: jasmine.objectContaining({ types: [], name: { firstName: 'Ana', nickname: '', lastName: 'López' } }) },
  { type: FeeCreationForm, values: { member: 7, month: date }, invalid: 'member', expected: { member: 7, month: date } },
  { type: FeeEditionForm, values: { transaction: { date } }, invalid: 'transaction.date', expected: { transaction: { date } } },
  { type: FeePaymentsForm, values: { member: 7, paymentDate: date, months: [date] }, invalid: 'member', expected: { member: 7, paymentDate: date, months: [date] } },
  { type: FileForm, values: { name: 'Rules', description: 'Club rules' }, invalid: 'name', expected: jasmine.objectContaining({ metadata: jasmine.objectContaining({ name: 'Rules', description: 'Club rules' }), content: jasmine.any(File) }) },
  { type: ImageForm, values: { name: 'Club photo', description: 'Members' }, invalid: 'name', expected: jasmine.objectContaining({ image: jasmine.objectContaining({ name: 'Club photo' }), file: jasmine.any(File) }) },
  { type: TransactionForm, values: { description: 'Donation', date, amount: 25 }, invalid: 'amount', expected: jasmine.objectContaining({ description: 'Donation', date, amount: 25 }) },
  { type: LibraryBookCreationForm, values: { title: { title: 'A Wizard of Earthsea' }, language: 'es' }, invalid: 'title.title', expected: jasmine.objectContaining({ book: jasmine.objectContaining({ title: jasmine.objectContaining({ title: 'A Wizard of Earthsea' }), language: 'es' }), kind: 'game' }) },
  { type: LibraryBookEditionForm, values: { title: { title: 'A Wizard of Earthsea' }, language: 'es' }, invalid: 'language', expected: jasmine.objectContaining({ title: jasmine.objectContaining({ title: 'A Wizard of Earthsea' }), language: 'es', donation: undefined }) },
  { type: LibraryBookLendingForm, values: { book: 3, borrower: 7, lendingDate: date }, invalid: 'lendingDate', expected: { book: 3, borrower: 7, lendingDate: date } },
  { type: LibraryBookReturnForm, values: { book: 3, borrower: 7, returnDate: date }, invalid: 'returnDate', expected: { book: 3, borrower: 7, returnDate: date } },
  { type: ScheduledGameForm, values: { title: 'One shot', maxPlayers: 4, start: date, master: 7 }, invalid: 'maxPlayers', expected: jasmine.objectContaining({ title: 'One shot', maxPlayers: 4, start: date, master: 7 }) },
  { type: RoleForm, values: { name: 'Reader' }, invalid: 'name', expected: { name: 'Reader', permissions: [] } },
  { type: RoleChangePermission, values: { permissions: [permission] }, expected: [permission] },
  { type: UserTokenExtendForm, values: { expirationDate: date }, invalid: 'expirationDate', expected: date },
  { type: UserForm, values: { username: 'ana', name: 'Ana López', email: 'ana@example.com' }, invalid: 'email', expected: { username: 'ana', name: 'Ana López', email: 'ana@example.com', roles: [] } },
  { type: ContactMethodForm, values: { number: 2, name: 'Email' }, invalid: 'name', expected: { number: 2, name: 'Email' } },
  { type: FeeTypeForm, values: { number: 2, name: 'Monthly', amount: 15 }, invalid: 'amount', expected: { number: 2, name: 'Monthly', amount: 15 } },
  { type: GameTableForm, values: { number: 2, name: 'Table A', description: 'Main room' }, invalid: 'description', expected: { number: 2, name: 'Table A', description: 'Main room' } },
  { type: NameForm, values: { number: 2, name: 'Le Guin' }, invalid: 'name', expected: { number: 2, name: 'Le Guin' } },
  { type: MemberKeyForm, values: { number: 2, available: true, description: 'Front door' }, expected: { number: 2, available: true, description: 'Front door' } }
];

type ManagedForm = InstanceType<typeof cases[number]['type']>;

for (const scenario of cases) {
  describe(`${scenario.type.name} form contract`, () => {
    let fixture: ComponentFixture<ManagedForm>;
    let component: ManagedForm;
    let emitted: jasmine.Spy;
    let form: FormGroup;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [scenario.type],
        providers: [provideZonelessChangeDetection(), provideNoopAnimations(),
          { provide: ImageService, useValue: { getAllForSelection: () => of([]) } },
          { provide: LibraryConfig, useValue: { getLanguages: () => [] } },
          { provide: LibraryService, useValue: { getGameSystems: () => of({ content: [], last: true }), getBookTypes: () => of({ content: [], last: true }) } }
        ]
      });
      fixture = TestBed.createComponent(scenario.type as Type<ManagedForm>);
      component = fixture.componentInstance;
      form = component.form as FormGroup;
      fixture.componentRef.setInput('showActions', false);
      fixture.componentRef.setInput('formId', 'form-contract');
      if (component instanceof FeePaymentsForm) {
        component.months.push(new FormControl(date, Validators.required));
      }
      form.patchValue(scenario.values);
      if (component instanceof FileForm || component instanceof ImageForm) {
        component.file = new File(['contents'], 'example.txt');
      }
      form.markAsPristine();
      emitted = spyOn(component.save, 'emit');
      fixture.detectChanges();
      expect(form.valid).withContext('explicit fixture must be valid').toBeTrue();
    });

    function edit(): void {
      form.markAsDirty();
    }

    function submit(): void {
      fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }

    it('does not submit valid unchanged data', () => {
      expect(component.saveEnabled).toBeFalse();
      submit();
      expect(emitted).not.toHaveBeenCalled();
    });

    it('emits the public payload once through native submission', () => {
      edit();
      submit();
      expect(emitted).toHaveBeenCalledOnceWith(scenario.expected);
    });

    it('blocks loading submissions and allows retry with the preserved edits', () => {
      edit();
      fixture.componentRef.setInput('loading', true);
      expect(component.formStatus.loading).toBeTrue();
      expect(form.disabled).toBeTrue();
      submit();
      expect(emitted).not.toHaveBeenCalled();
      fixture.componentRef.setInput('loading', false);
      expect(form.enabled).toBeTrue();
      expect(form.dirty).toBeTrue();
      submit();
      expect(emitted).toHaveBeenCalledOnceWith(scenario.expected);
    });

    if ('invalid' in scenario) {
      it('rejects a real invalid field and exposes its validation state', () => {
        form.get(scenario.invalid!)!.setValue(null);
        edit();
        expect(form.invalid).toBeTrue();
        submit();
        expect(form.get(scenario.invalid!)!.touched).toBeTrue();
        expect(emitted).not.toHaveBeenCalled();
      });
    }

    it('hides inline actions when the drawer owns them', () => {
      expect(fixture.nativeElement.querySelector('[data-action="submit"]')).toBeNull();
      expect(fixture.nativeElement.querySelector('[data-action="cancel"]')).toBeNull();
    });

    it('cancels inline editing without submitting', () => {
      const cancelled = spyOn(component.cancelEdition, 'emit');
      fixture.componentRef.setInput('showActions', true);
      fixture.detectChanges();
      fixture.nativeElement.querySelector('[data-action="cancel"]').click();
      expect(cancelled).toHaveBeenCalledTimes(1);
      expect(emitted).not.toHaveBeenCalled();
    });
  });
}
