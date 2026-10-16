import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { UserForm } from './user-form';
import { Role, User } from '@bernardo-mg/authentication';
import { Profile } from '@ucronia/domain';

describe('UserForm', () => {
  let fixture: ComponentFixture<UserForm>;
  let component: UserForm;

  beforeEach(() => {
    fixture = createFormFixture(UserForm);
    component = fixture.componentInstance;
  });

  it('serializes role names when inviting a user', () => {
    const saved = spyOn(component.save, 'emit');
    editForm(component.form, { username: 'ana', name: 'Ana', email: 'ana@example.com' });
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
