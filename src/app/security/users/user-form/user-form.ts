import { Component, inject, Input, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberSearch, MemberSearchEvent } from '@app/shared/member/member-search/member-search';
import { Role, User } from '@bernardo-mg/authentication';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { TextFilter } from '@bernardo-mg/ui';
import { Profile } from '@ucronia/domain';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'access-user-form',
  imports: [TextFilter, ReactiveFormsModule, InputTextModule, MessageModule, MemberSearch],
  templateUrl: './user-form.html'
})
export class UserForm implements OnChanges {

  public readonly create = input(true);
  @Input() public set data(value: User) {
    this.form.reset(value as any);
    this.username = value.username;
    this.roles = [...value.roles];
  }
  public readonly failures = input(new FailureStore());
  public readonly formId = input<string | null>(null);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }
  @Input() public set member(value: Profile) {
    this.selectedMember = value ?? new Profile();
  }
  public readonly members = input<Profile[]>([]);
  public readonly selection = input<Role[]>([]);

  public readonly save = output<UserFormData>();
  public readonly searchMember = output<MemberSearchEvent>();
  public readonly update = output<UserEditionFormData>();

  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;
  public get roleOptions(): Role[] {
    const roles = new Map<string, Role>();

    [...this.roles, ...this.selection()].forEach(role => roles.set(role.name, role));

    return Array.from(roles.values())
      .sort((first, second) => first.name.localeCompare(second.name));
  }
  public roles: Role[] = [];
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }
  public selectedMember = new Profile();
  public username = '';

  public constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roles: [[]]
    });

    this.formStatus = new FormStatus(this.form);
  }

  // Lifecycle hooks
  public ngOnChanges({ selection }: SimpleChanges): void {
    if (selection && this.create()) {
      this.roles = [];
    }
  }

  // Event handlers
  public onRemoveMember(): void {
    this.selectedMember = new Profile();
    this.form.markAsDirty();
  }

  /**
   * Handler for the save event.
   */
  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      this.form.get('roles')?.setValue(this.roles.map(role => role.name));
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

  public onSelectMember(member: Profile): void {
    this.selectedMember = member;
    this.form.markAsDirty();
  }

  // Public methods
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

export interface UserEditionFormData {
  name: string;
  email: string;
  roles: Role[];
  member: Profile;
}
