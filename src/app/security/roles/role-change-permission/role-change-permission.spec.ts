import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RoleService } from '../role-service';
import { RoleChangePermission } from './role-change-permission';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('RoleChangePermission', () => {
  let component: RoleChangePermission;
  let fixture: ComponentFixture<RoleChangePermission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RoleChangePermission
      ],
      providers: [
        RoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoleChangePermission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('requires a selection change and blocks saving during loading', () => {
    const permission = { name: 'test:read', resource: 'test', action: 'read' };
    fixture.componentRef.setInput('permissions', [permission]);
    fixture.detectChanges();
    const emitted = spyOn(component.save, 'emit');
    expect(component.saveEnabled).toBeFalse();
    component.onSave();
    expect(emitted).not.toHaveBeenCalled();
    component.clearSelection();
    expect(component.saveEnabled).toBeTrue();
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    component.onSave();
    expect(component.form.disabled).toBeTrue();
    expect(emitted).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('fieldset').disabled).toBeTrue();
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
    component.onSave();
    expect(emitted).toHaveBeenCalledWith([]);
  });
});

describe('RoleChangePermission permission options', () => {
  it('shows every permission and disables search', fakeAsync(() => {
    const permissions = [
      { name: 'book:read', resource: 'book', action: 'read' },
      { name: 'fee:update', resource: 'fee', action: 'update' }
    ];
    TestBed.configureTestingModule({ imports: [RoleChangePermission] });
    const fixture = TestBed.createComponent(RoleChangePermission);
    fixture.componentRef.setInput('selection', permissions);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(fixture.componentInstance.permissionGroups.flatMap(group => group.permissions)).toEqual(permissions);
    expect(fixture.nativeElement.querySelector('input[type="search"]').disabled).toBeTrue();
  }));
});

describe('RoleChangePermission form submission', () => {
  const permission = { name: 'book:read', resource: 'book', action: 'read' };
  const scenario = { values: { permissions: [permission] }, expected: [permission] };

  let fixture: ComponentFixture<RoleChangePermission>;
  let component: RoleChangePermission;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoleChangePermission],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(RoleChangePermission);
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

  it('leaves submit and cancel controls to the drawer', () => {
    expect(fixture.nativeElement.querySelector('[data-action="submit"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[data-action="cancel"]')).toBeNull();
  });
});
