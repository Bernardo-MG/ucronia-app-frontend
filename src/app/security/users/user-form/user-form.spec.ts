import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { UserForm } from './user-form';
import { Role, User } from '@bernardo-mg/authentication';
import { Profile } from '@ucronia/domain';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { FormGroup } from '@angular/forms';

describe('UserForm', () => {
  let fixture: ComponentFixture<UserForm>;
  let component: UserForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(UserForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('serializes role names when inviting a user', () => {
    const saved = spyOn(component.save, 'emit');
    component.form.patchValue({ username: 'ana', name: 'Ana', email: 'ana@example.com' });
    component.form.get('username')?.markAsDirty();
    component.form.get('name')?.markAsDirty();
    component.form.get('email')?.markAsDirty();
    const role = new Role('Reader', []);
    component.toggleRole(role, true);
    component.toggleRole(role, true);
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith({ username: 'ana', name: 'Ana', email: 'ana@example.com', roles: ['Reader'] });
  });

  it('emits an update, preserving role objects and the selected member', () => {
    fixture.componentRef.setInput('create', false);
    fixture.componentRef.setInput('data', Object.assign(new User(), { username: 'ana', name: 'Ana', email: 'ana@example.com', roles: [] }));
    fixture.detectChanges();
    const saved = spyOn(component.save, 'emit');
    const updated = spyOn(component.update, 'emit');
    const member = Object.assign(new Profile(), { number: 7 });
    component.onSelectMember(member);
    component.onSave();
    expect(saved).not.toHaveBeenCalled();
    expect(updated).toHaveBeenCalledOnceWith({ name: 'Ana', email: 'ana@example.com', roles: [], member });
  });
});

@Component({
  imports: [UserForm],
  template: `<access-user-form formId="user-search" [create]="false" [selection]="[]"
    [member]="profile" [members]="members" [data]="user" (searchMember)="onQuery($event.query)" />`
})
class ReusedUserHost {
  public user = Object.assign(new User(), { username: 'alice', name: 'Alice', email: 'alice@example.com' });
  public profile = new Profile();
  public members: Profile[] = [];
  public queries: string[] = [];

  public onQuery(value: string): void {
    this.queries.push(value);
    this.members = [];
  }
}

describe('UserForm search reset', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ReusedUserHost], providers: [provideNoopAnimations()] }));

  function type(input: HTMLInputElement, value: string): void {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  it('resets a reused user form without erasing the new selected profile', fakeAsync(() => {
    const fixture = TestBed.createComponent(ReusedUserHost);
    fixture.detectChanges();
    tick();
    type(fixture.nativeElement.querySelector('#user-search-member-search'), 'previous');
    fixture.detectChanges();
    tick(100);
    const profile = new Profile();
    profile.number = 2;
    profile.name.fullName = 'Bob';
    fixture.componentInstance.profile = profile;
    fixture.componentInstance.user = Object.assign(new User(), { username: 'bob', name: 'Bob', email: 'bob@example.com' });
    fixture.detectChanges();
    fixture.checkNoChanges();
    flushMicrotasks();
    fixture.detectChanges();
    fixture.checkNoChanges();
    tick(400);
    expect(fixture.componentInstance.queries).not.toContain('previous');
    expect(fixture.nativeElement.querySelector('#user-search-member-search').value).toBe('Bob');
  }));
});

describe('user-form backend results', () => {
  it('shows all server-supplied role options with search disabled', fakeAsync(() => {
    TestBed.configureTestingModule({ imports: [UserForm] });
    const fixture = TestBed.createComponent(UserForm);
    const roles = [new Role('Admin', []), new Role('Reader', [])];
    fixture.componentRef.setInput('selection', roles);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(fixture.componentInstance.roleOptions).toEqual(roles);
    expect(fixture.nativeElement.querySelector('input[type="search"]').disabled).toBeTrue();
  }));
});

describe('UserForm form submission', () => {
  const scenario = { values: { username: 'ana', name: 'Ana López', email: 'ana@example.com' }, invalid: 'email', expected: { username: 'ana', name: 'Ana López', email: 'ana@example.com', roles: [] } };

  let fixture: ComponentFixture<UserForm>;
  let component: UserForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(UserForm);
    component = fixture.componentInstance;
    form = component.form as FormGroup;
    fixture.componentRef.setInput('showActions', false);
    fixture.componentRef.setInput('formId', 'form-contract');

    form.patchValue(scenario.values);

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

  it('rejects a real invalid field and exposes its validation state', () => {
    form.get(scenario.invalid)!.setValue(null);
    edit();
    expect(form.invalid).toBeTrue();
    submit();
    expect(form.get(scenario.invalid)!.touched).toBeTrue();
    expect(emitted).not.toHaveBeenCalled();
  });

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
