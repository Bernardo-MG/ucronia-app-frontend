import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { ResourcePermission, Role } from '@bernardo-mg/authentication';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'access-role-change-permission',
  imports: [ButtonModule],
  templateUrl: './role-change-permission.html'
})
export class RoleChangePermission implements OnChanges {

  public readonly data = input(new Role());
  public readonly selection = input<ResourcePermission[]>([]);
  public readonly permissions = input<ResourcePermission[]>([]);
  public readonly loading = input(false);

  public readonly save = output<ResourcePermission[]>();
  public readonly cancelEdition = output<void>();

  public selected: ResourcePermission[] = [];
  public filterValue = '';

  public ngOnChanges({ permissions }: SimpleChanges): void {
    if (permissions) {
      this.selected = [...permissions.currentValue];
    }
  }

  public get permissionGroups(): PermissionGroup[] {
    const filter = this.filterValue.trim().toLocaleLowerCase();
    const groups = new Map<string, ResourcePermission[]>();

    this.allPermissions
      .filter(permission => !filter || [permission.resource, permission.action, permission.name].some(value => value.toLocaleLowerCase().includes(filter)))
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

  public get allVisibleSelected(): boolean {
    const groups = this.permissionGroups;
    return groups.length > 0 && groups.every(group => this.isGroupSelected(group));
  }

  public get visibleSelectionIndeterminate(): boolean {
    const hasSelection = this.permissionGroups.some(group => this.selectedInGroup(group) > 0);
    return hasSelection && !this.allVisibleSelected;
  }

  public isSelected(permission: ResourcePermission): boolean {
    return this.selected.some(selected => this.permissionKey(selected) === this.permissionKey(permission));
  }

  public isGroupSelected(group: PermissionGroup): boolean {
    return group.permissions.length > 0 && group.permissions.every(permission => this.isSelected(permission));
  }

  public isGroupPartiallySelected(group: PermissionGroup): boolean {
    const selected = this.selectedInGroup(group);
    return selected > 0 && selected < group.permissions.length;
  }

  public selectedInGroup(group: PermissionGroup): number {
    return group.permissions.filter(permission => this.isSelected(permission)).length;
  }

  public togglePermission(permission: ResourcePermission, checked: boolean): void {
    if (checked && !this.isSelected(permission)) {
      this.selected = [...this.selected, permission];
    } else if (!checked) {
      this.selected = this.selected.filter(selected => this.permissionKey(selected) !== this.permissionKey(permission));
    }
  }

  public toggleGroup(group: PermissionGroup, checked: boolean): void {
    group.permissions.forEach(permission => this.togglePermission(permission, checked));
  }

  public selectAllVisible(): void {
    this.permissionGroups.forEach(group => this.toggleGroup(group, true));
  }

  public clearVisibleSelection(): void {
    this.permissionGroups.forEach(group => this.toggleGroup(group, false));
  }

  public clearSelection(): void {
    this.selected = [];
  }

  public formatLabel(value: string): string {
    const label = value.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[._-]+/g, ' ').trim();
    return label ? label.charAt(0).toLocaleUpperCase() + label.slice(1) : value;
  }

  public onSave(): void {
    this.save.emit(this.selected);
  }

  private permissionKey(permission: ResourcePermission): string {
    return permission.name || `${permission.resource}:${permission.action}`;
  }

  private get allPermissions(): ResourcePermission[] {
    const permissions = new Map<string, ResourcePermission>();

    [...this.permissions(), ...this.selection()].forEach(permission => {
      permissions.set(this.permissionKey(permission), permission);
    });

    return Array.from(permissions.values());
  }

}

interface PermissionGroup {
  resource: string;
  permissions: ResourcePermission[];
}