import { Component, inject, input, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResourcePermission, Role } from '@bernardo-mg/authentication';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'access-role-form',
  imports: [ReactiveFormsModule, InputTextModule, MessageModule, ButtonModule],
  templateUrl: './role-form.html'
})
export class RoleForm implements OnChanges {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  public readonly selection = input<ResourcePermission[]>([]);

  @Input() public set data(value: Role) {
    this.form.patchValue(value as any);
    this.permissions = [...value.permissions];
  }

  public readonly save = output<Role>();
  public readonly cancelEdition = output<void>();

  public permissions: ResourcePermission[] = [];

  public filterValue = '';

  public formStatus: FormStatus;

  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      name: ['', Validators.required],
      permissions: [[]]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  public get permissionGroups(): PermissionGroup[] {
    const filter = this.filterValue.trim().toLocaleLowerCase();
    const groups = new Map<string, ResourcePermission[]>();

    this.selection()
      .filter(permission => {
        if (!filter) {
          return true;
        }

        return [
          permission.resource,
          permission.action,
          permission.name
        ].some(value => value.toLocaleLowerCase().includes(filter));
      })
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

  public get allVisibleSelected(): boolean {
    const groups = this.permissionGroups;

    return groups.length > 0
      && groups.every(group => this.isGroupSelected(group));
  }

  public get visibleSelectionIndeterminate(): boolean {
    const hasSelection = this.permissionGroups.some(group => {
      return this.selectedInGroup(group) > 0;
    });

    return hasSelection && !this.allVisibleSelected;
  }

  public onSave(): void {
    this.form.get('permissions')?.setValue(this.permissions);

    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property)
      || this.failures().hasFailures(property);
  }

  public isSelected(permission: ResourcePermission): boolean {
    return this.permissions.some(selected => {
      return this.permissionKey(selected) === this.permissionKey(permission);
    });
  }

  public isGroupSelected(group: PermissionGroup): boolean {
    return group.permissions.every(permission => {
      return this.isSelected(permission);
    });
  }

  public isGroupPartiallySelected(group: PermissionGroup): boolean {
    const selected = group.permissions.filter(permission => {
      return this.isSelected(permission);
    }).length;

    return selected > 0 && selected < group.permissions.length;
  }

  public selectedInGroup(group: PermissionGroup): number {
    return group.permissions.filter(permission => {
      return this.isSelected(permission);
    }).length;
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

  public toggleGroup(group: PermissionGroup, checked: boolean): void {
    group.permissions.forEach(permission => {
      this.togglePermission(permission, checked);
    });
  }

  public selectAllVisible(): void {
    this.permissionGroups.forEach(group => {
      this.toggleGroup(group, true);
    });
  }

  public clearVisibleSelection(): void {
    this.permissionGroups.forEach(group => {
      this.toggleGroup(group, false);
    });
  }

  public clearSelection(): void {
    this.permissions = [];
    this.form.markAsDirty();
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

  private permissionKey(permission: ResourcePermission): string {
    return permission.name
      || `${permission.resource}:${permission.action}`;
  }

}

interface PermissionGroup {
  resource: string;
  permissions: ResourcePermission[];
}