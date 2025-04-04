import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { Role } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { BlockUiDirective, JustifyCenterDirective } from '@bernardo-mg/layout';
import { PaginatedResponse } from '@bernardo-mg/request';

@Component({
  selector: 'access-user-add-role',
  imports: [CommonModule, PaginationNavigationComponent, JustifyCenterDirective, IconAddComponent, BlockUiDirective],
  templateUrl: './access-user-add-role.component.html'
})
export class AccessUserAddRoleComponent implements OnInit {

  @Input() public roles = new PaginatedResponse<Role>();

  @Input() public waiting = false;

  @Output() public addRole = new EventEmitter<Role>();

  @Output() public goToPage = new EventEmitter<number>();

  ngOnInit(): void {
    this.onGoToPage(0);
  }

  public onAdd(data: Role): void {
    this.addRole.emit(data);
  }

  public onGoToPage(page: number): void {
    this.goToPage.emit(page);
  }

}
