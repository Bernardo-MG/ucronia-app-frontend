import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { Role } from '@bernardo-mg/authentication';
import { SortingProperty } from '@bernardo-mg/request';

@Component({
  selector: 'access-role-selection-list',
  imports: [CommonModule, RouterModule, SortingButtonComponent],
  templateUrl: './access-role-selection-list.component.html'
})
export class AccessRoleSelectionListComponent {

  @Input() public roles: Role[] = [];

  @Input() public routeLinkAdapter: (data: Role) => string = (data) => '';

  @Output() public changeDirection = new EventEmitter<SortingProperty>();

}
