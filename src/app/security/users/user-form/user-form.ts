import { Component, inject, Input, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role, User } from '@bernardo-mg/authentication';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'access-user-form',
  imports: [ReactiveFormsModule, InputTextModule, MessageModule, ButtonModule],
  templateUrl: './user-form.html'
})
export class UserForm implements OnChanges {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  public readonly create = input(true);
  public readonly selection = input<Role[]>([]);

  @Input() public set data(value: User) {
    this.form.patchValue(value as any);
    this.username = value.username;
  }

  public readonly save = output<UserFormData>();
  public readonly cancel = output<void>();

  public formStatus: FormStatus;
  public form: FormGroup;
  public username = '';
  public roles: Role[] = [];
  public roleFilter = '';

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roles: [[]]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading, selection }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
    if (selection) {
      this.roles = [];
    }
  }

  public get filteredRoles(): Role[] {
    const filter = this.roleFilter.trim().toLocaleLowerCase();
    return this.selection().filter(role => !filter || role.name.toLocaleLowerCase().includes(filter));
  }

  /**
   * Handler for the save event.
   */
  public onSave(): void {
    this.form.get('roles')?.setValue(this.roles.map(role => role.name));
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

  public isRoleSelected(role: Role): boolean {
    return this.roles.some(selected => selected.name === role.name);
  }

  public toggleRole(role: Role, checked: boolean): void {
    if (checked && !this.isRoleSelected(role)) {
      this.roles = [...this.roles, role];
    } else if (!checked) {
      this.roles = this.roles.filter(selected => selected.name !== role.name);
    }

    this.form.markAsDirty();
  }

}

export class UserFormData {
  public username = '';
  public name = '';
  public email = '';
  public roles: string[] = [];
}