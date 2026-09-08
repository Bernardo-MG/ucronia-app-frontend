import { Component, input } from '@angular/core';
import { ResourcePermission, Role } from '@bernardo-mg/authentication';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'access-role-info',
  imports: [SkeletonModule],
  templateUrl: './role-info.html'
})
export class RoleInfo {

  public readonly data = input(new Role());
  public readonly loading = input(false);

  public filterValue = '';

  public get resourceCount(): number {
    return new Set(
      this.data().permissions.map(permission => permission.resource)
    ).size;
  }

  public get permissionGroups(): PermissionGroup[] {
    const filter = this.filterValue.trim().toLocaleLowerCase();
    const groups = new Map<string, ResourcePermission[]>();

    this.data().permissions
      .filter(permission => !filter || [
        permission.resource,
        permission.action,
        permission.name
      ].some(value => value.toLocaleLowerCase().includes(filter)))
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

  public formatLabel(value: string): string {
    const label = value
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[._-]+/g, ' ')
      .trim();

    return label
      ? label.charAt(0).toLocaleUpperCase() + label.slice(1)
      : value;
  }

}

interface PermissionGroup {
  resource: string;
  permissions: ResourcePermission[];
}