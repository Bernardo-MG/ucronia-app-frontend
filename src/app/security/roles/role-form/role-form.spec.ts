import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RoleForm } from './role-form';
import { ResourcePermission } from '@bernardo-mg/authentication';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('RoleForm', () => {
  let fixture: ComponentFixture<RoleForm>;
  let component: RoleForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoleForm],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(RoleForm);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('does not duplicate selected permissions', () => {
    const permission = { name: 'book:read', resource: 'book', action: 'read' } as ResourcePermission;
    component.togglePermission(permission, true);
    component.togglePermission(permission, true);
    expect(component.permissions).toEqual([permission]);
  });

  it('submits changed permissions with the role name', () => {
    const saved = spyOn(component.save, 'emit');
    const permission = { name: 'book:read', resource: 'book', action: 'read' } as ResourcePermission;
    component.form.patchValue({ name: 'Reader' });
    component.form.get('name')?.markAsDirty();
    component.togglePermission(permission, true);
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith({ name: 'Reader', permissions: [permission] });
  });
});

describe('RoleForm permission options', () => {
  it('shows every permission and disables search', fakeAsync(() => {
    const permissions = [
      { name: 'book:read', resource: 'book', action: 'read' },
      { name: 'fee:update', resource: 'fee', action: 'update' }
    ];
    TestBed.configureTestingModule({ imports: [RoleForm] });
    const fixture = TestBed.createComponent(RoleForm);
    fixture.componentRef.setInput('selection', permissions);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(fixture.componentInstance.permissionGroups.flatMap(group => group.permissions)).toEqual(permissions);
    expect(fixture.nativeElement.querySelector('input[type="search"]').disabled).toBeTrue();
  }));
});

describe('RoleForm form submission', () => {
  const scenario = { values: { name: 'Reader' }, invalid: 'name', expected: { name: 'Reader', permissions: [] } };

  let fixture: ComponentFixture<RoleForm>;
  let component: RoleForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoleForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(RoleForm);
    component = fixture.componentInstance;
    form = component.form as FormGroup;
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

  it('leaves submit and cancel controls to the drawer', () => {
    expect(fixture.nativeElement.querySelector('[data-action="submit"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[data-action="cancel"]')).toBeNull();
  });
});
