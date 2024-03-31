import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '@app/core/authentication/models/role';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { SortingButtonComponent } from '@app/shared/sorting/sorting-button/sorting-button.component';

@Component({
  selector: 'access-user-roles',
  standalone: true,
  imports: [CommonModule, IconsModule, WaitingWrapperComponent, SortingButtonComponent, PaginationNavigationComponent],
  templateUrl: './access-user-roles.component.html'
})
export class AccessUserRoleFormComponent {

  @Input() public roles: Role[] = [];

  @Input() public editable = false;

  @Input() public deletable = false;

  @Input() public waiting = false;

  @Output() public remove = new EventEmitter<Role>();

  constructor() { }

  public onRemove(role: Role): void {
    this.remove.emit(role);
  }

}
