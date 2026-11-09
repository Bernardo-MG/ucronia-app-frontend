import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResourcePermission, Role } from '@bernardo-mg/authentication';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { TextFilter } from '@bernardo-mg/ui';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'access-role-form',
  imports: [TextFilter, ReactiveFormsModule, InputTextModule, MessageModule],
  templateUrl: './role-form.html'
})
export class RoleForm {

  @Input() public set data(value: Role) {
    this.form.reset(value as any);
    this.isEdit = true;
    this.permissions = [...value.permissions];
  }

  public readonly failures = input(new FailureStore());

  public readonly formId = input<string | null>(null);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }
  public readonly selection = input<ResourcePermission[]>([]);

  public readonly save = output<Role>();

  public get allVisibleSelected(): boolean {
    const groups = this.permissionGroups;

    return groups.length > 0
      && groups.every(group => this.isGroupSelected(group));
  }

  public readonly form: FormGroup;


  public readonly formStatus: FormStatus;

  public isEdit = false;

  public get permissionGroups(): PermissionGroup[] {
    const groups = new Map<string, ResourcePermission[]>();

    this.selection()
      .forEach(permission => {
        const permissions = groups.get(permission.resource) ?? [];

        permissions.push(permission);
        groups.set(permission.resource, permissions);
      });

    return Array.from(groups.entries())
      .map(([resource, permissions]) => ({
        resource,
        permissions: permissions.sort((first, second) => {
          return first.action.localeCompare(second.action);
        })
      }))
      .sort((first, second) => {
        return first.resource.localeCompare(second.resource);
      });
  }
  public permissions: ResourcePermission[] = [];

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  public get visibleSelectionIndeterminate(): boolean {
    const hasSelection = this.permissionGroups.some(group => {
      return this.selectedInGroup(group) > 0;
    });

    return hasSelection && !this.allVisibleSelected;
  }

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      name: ['', Validators.required],
      permissions: [[]]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      this.form.get('permissions')?.setValue(this.permissions);
      this.save.emit(this.form.value);
    }
  }

  public clearSelection(): void {
    this.permissions = [];
    this.form.markAsDirty();
  }

  public clearVisibleSelection(): void {
    this.permissionGroups.forEach(group => {
      this.toggleGroup(group, false);
    });
  }

  public formatLabel(value: string): string {
    const label = value
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[._-]+/g, ' ')
      .trim();

    return label
      ? label.charAt(0).toLocaleUpperCase() + label.slice(1)
      : value;
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property)
      || this.failures().hasFailures(property);
  }

  public isGroupPartiallySelected(group: PermissionGroup): boolean {
    const selected = group.permissions.filter(permission => {
      return this.isSelected(permission);
    }).length;

    return selected > 0 && selected < group.permissions.length;
  }

  public isGroupSelected(group: PermissionGroup): boolean {
    return group.permissions.every(permission => {
      return this.isSelected(permission);
    });
  }

  public isSelected(permission: ResourcePermission): boolean {
    return this.permissions.some(selected => {
      return this.permissionKey(selected) === this.permissionKey(permission);
    });
  }

  public selectAllVisible(): void {
    this.permissionGroups.forEach(group => {
      this.toggleGroup(group, true);
    });
  }

  public selectedInGroup(group: PermissionGroup): number {
    return group.permissions.filter(permission => {
      return this.isSelected(permission);
    }).length;
  }

  public toggleGroup(group: PermissionGroup, checked: boolean): void {
    group.permissions.forEach(permission => {
      this.togglePermission(permission, checked);
    });
  }

  public togglePermission(permission: ResourcePermission, checked: boolean): void {
    if (checked && !this.isSelected(permission)) {
      this.permissions = [...this.permissions, permission];
    } else if (!checked) {
      this.permissions = this.permissions.filter(selected => {
        return this.permissionKey(selected) !== this.permissionKey(permission);
      });
    }

    this.form.markAsDirty();
  }

  private permissionKey(permission: ResourcePermission): string {
    return permission.name
      || `${permission.resource}:${permission.action}`;
  }

}

interface PermissionGroup {
  resource: string;
  permissions: ResourcePermission[];
}
