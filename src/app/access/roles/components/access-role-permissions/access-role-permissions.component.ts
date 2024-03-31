import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourcePermission } from '@app/core/authentication/models/resource-permission';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { SortingButtonComponent } from '@app/shared/sorting/sorting-button/sorting-button.component';

@Component({
  selector: 'access-role-permissions',
  standalone: true,
  imports: [CommonModule, IconsModule, WaitingWrapperComponent, SortingButtonComponent],
  templateUrl: './access-role-permissions.component.html'
})
export class AccessRolePermissionsComponent {

  @Input() public permissions: ResourcePermission[] = [];

  @Input() public deletable = false;

  @Input() public waiting = false;

  @Output() public remove = new EventEmitter<ResourcePermission>();

  public onRemove(permission: ResourcePermission): void {
    this.remove.emit(permission);
  }

}
