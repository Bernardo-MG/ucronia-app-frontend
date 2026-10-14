import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { RoleForm } from './role-form';
import { ResourcePermission } from '@bernardo-mg/authentication';

describe('RoleForm', () => {
  let fixture: ComponentFixture<RoleForm>;
  let component: RoleForm;

  beforeEach(() => {
    fixture = createFormFixture(RoleForm);
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
    editForm(component.form, { name: 'Reader' });
    component.togglePermission(permission, true);
    component.onSave();
    expect(saved).toHaveBeenCalledOnceWith({ name: 'Reader', permissions: [permission] });
  });
});
