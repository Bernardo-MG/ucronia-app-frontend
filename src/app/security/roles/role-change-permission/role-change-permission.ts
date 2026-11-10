import { Component, inject, input, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ResourcePermission, Role } from '@bernardo-mg/authentication';
import { FormStatus } from '@bernardo-mg/form';
import { TextFilter } from '@bernardo-mg/ui';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'access-role-change-permission',
  imports: [TextFilter, ReactiveFormsModule, ButtonModule],
  templateUrl: './role-change-permission.html'
})
export class RoleChangePermission implements OnChanges {

  public readonly data = input(new Role());
  public readonly formId = input<string | null>(null);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }
  public readonly permissions = input<ResourcePermission[]>([]);
  public readonly selection = input<ResourcePermission[]>([]);

  public readonly save = output<ResourcePermission[]>();

  public get allVisibleSelected(): boolean {
    const groups = this.permissionGroups;
    return groups.length > 0 && groups.every(group => this.isGroupSelected(group));
  }
  public readonly form;
  public readonly formStatus: FormStatus;
  public get permissionGroups(): PermissionGroup[] {
    const groups = new Map<string, ResourcePermission[]>();

    this.allPermissions
      .forEach(permission => {
        const permissions = groups.get(permission.resource) ?? [];
        permissions.push(permission);
        groups.set(permission.resource, permissions);
      });

    return Array.from(groups.entries())
      .map(([resource, permissions]) => ({
        resource,
        permissions: permissions.sort((first, second) => first.action.localeCompare(second.action))
      }))
      .sort((first, second) => first.resource.localeCompare(second.resource));
  }
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }
  public get selected(): ResourcePermission[] {
    return this.form.controls.permissions.value;
  }
  public set selected(value: ResourcePermission[]) {
    this.form.controls.permissions.setValue(value);
    this.form.markAsDirty();
  }
  public get visibleSelectionIndeterminate(): boolean {
    const hasSelection = this.permissionGroups.some(group => this.selectedInGroup(group) > 0);
    return hasSelection && !this.allVisibleSelected;
  }

  private get allPermissions(): ResourcePermission[] {
    const permissions = new Map<string, ResourcePermission>();

    [...this.permissions(), ...this.selection()].forEach(permission => {
      permissions.set(this.permissionKey(permission), permission);
    });

    return Array.from(permissions.values());
  }

  public constructor() {
    const formBuilder = inject(FormBuilder);
    this.form = formBuilder.nonNullable.group({ permissions: [[] as ResourcePermission[]] });
    this.formStatus = new FormStatus(this.form);
  }

  // Lifecycle hooks
  public ngOnChanges({ permissions }: SimpleChanges): void {
    if (permissions) {
      this.form.reset({ permissions: [...permissions.currentValue] });
    }
  }

  // Event handlers
  public clearSelection(): void {
    this.selected = [];
  }

  public clearVisibleSelection(): void {
    this.permissionGroups.forEach(group => this.toggleGroup(group, false));
  }

  public onSave(): void {
    if (this.saveEnabled) {
      this.save.emit(this.selected);
    }
  }

  public selectAllVisible(): void {
    this.permissionGroups.forEach(group => this.toggleGroup(group, true));
  }

  public toggleGroup(group: PermissionGroup, checked: boolean): void {
    group.permissions.forEach(permission => this.togglePermission(permission, checked));
  }

  public togglePermission(permission: ResourcePermission, checked: boolean): void {
    if (checked && !this.isSelected(permission)) {
      this.selected = [...this.selected, permission];
    } else if (!checked) {
      this.selected = this.selected.filter(selected => this.permissionKey(selected) !== this.permissionKey(permission));
    }
  }

  // Public methods
  public formatLabel(value: string): string {
    const label = value.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[._-]+/g, ' ').trim();
    return label ? label.charAt(0).toLocaleUpperCase() + label.slice(1) : value;
  }

  public isGroupPartiallySelected(group: PermissionGroup): boolean {
    const selected = this.selectedInGroup(group);
    return selected > 0 && selected < group.permissions.length;
  }

  public isGroupSelected(group: PermissionGroup): boolean {
    return group.permissions.length > 0 && group.permissions.every(permission => this.isSelected(permission));
  }

  public isSelected(permission: ResourcePermission): boolean {
    return this.selected.some(selected => this.permissionKey(selected) === this.permissionKey(permission));
  }

  public selectedInGroup(group: PermissionGroup): number {
    return group.permissions.filter(permission => this.isSelected(permission)).length;
  }

  // Private methods
  private permissionKey(permission: ResourcePermission): string {
    return permission.name || `${permission.resource}:${permission.action}`;
  }

}

interface PermissionGroup {
  resource: string;
  permissions: ResourcePermission[];
}
