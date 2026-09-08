import { Component, inject, Input, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role, User } from '@bernardo-mg/authentication';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Profile } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MemberSearch, MemberSearchEvent } from '../../../shared/member/member-search/member-search';

@Component({
  selector: 'access-user-form',
  imports: [ReactiveFormsModule, InputTextModule, MessageModule, ButtonModule, MemberSearch],
  templateUrl: './user-form.html'
})
export class UserForm implements OnChanges {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  public readonly create = input(true);
  public readonly selection = input<Role[]>([]);
  public readonly members = input<Profile[]>([]);

  @Input() public set data(value: User) {
    this.form.patchValue(value as any);
    this.username = value.username;
    this.roles = [...value.roles];
  }

  @Input() public set member(value: Profile) {
    this.selectedMember = value ?? new Profile();
  }

  public readonly save = output<UserFormData>();
  public readonly update = output<UserEditionFormData>();
  public readonly cancelEdition = output<void>();
  public readonly searchMember = output<MemberSearchEvent>();

  public formStatus: FormStatus;
  public form: FormGroup;
  public username = '';
  public roles: Role[] = [];
  public roleFilter = '';
  public selectedMember = new Profile();

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
    if (selection && this.create()) {
      this.roles = [];
    }
  }

  public get filteredRoles(): Role[] {
    const filter = this.roleFilter.trim().toLocaleLowerCase();
    const roles = new Map<string, Role>();

    [...this.roles, ...this.selection()].forEach(role => roles.set(role.name, role));

    return Array.from(roles.values())
      .filter(role => !filter || role.name.toLocaleLowerCase().includes(filter))
      .sort((first, second) => first.name.localeCompare(second.name));
  }

  /**
   * Handler for the save event.
   */
  public onSave(): void {
    this.form.get('roles')?.setValue(this.roles.map(role => role.name));

    if (this.form.valid) {
      if (this.create()) {
        this.save.emit(this.form.value);
      } else {
        this.update.emit({
          name: this.form.get('name')?.value,
          email: this.form.get('email')?.value,
          roles: this.roles,
          member: this.selectedMember
        });
      }
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

  public onSelectMember(member: Profile): void {
    this.selectedMember = member;
    this.form.markAsDirty();
  }

  public onRemoveMember(): void {
    this.selectedMember = new Profile();
    this.form.markAsDirty();
  }

}

export class UserFormData {
  public username = '';
  public name = '';
  public email = '';
  public roles: string[] = [];
}

export interface UserEditionFormData {
  name: string;
  email: string;
  roles: Role[];
  member: Profile;
}