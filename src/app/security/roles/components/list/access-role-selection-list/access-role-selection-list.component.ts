import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SortProperty } from '@app/core/api/models/sort-field';
import { Role } from '@app/core/authentication/models/role';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';

@Component({
  selector: 'access-role-selection-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SortingButtonComponent],
  templateUrl: './access-role-selection-list.component.html'
})
export class AccessRoleSelectionListComponent {

  @Input() public page = new PaginatedResponse<Role[]>([]);

  @Output() public changeDirection = new EventEmitter<SortProperty>();

}
