import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageInfo } from '@app/core/api/models/page-info';
import { Role } from '@app/core/authentication/models/role';

@Component({
  selector: 'access-user-role-selection',
  templateUrl: './access-user-role-selection.component.html'
})
export class AccessUserRoleSelectionComponent implements OnInit {

  @Input() public roles: Role[] = [];

  @Input() public pageInfo = new PageInfo();

  @Output() public selectRole = new EventEmitter<Role>();

  @Output() public goTo = new EventEmitter<number>();

  public ngOnInit(): void {
    this.goTo.emit(0);
  }

  public onSelect(role: Role) {
    this.selectRole.emit(role);
  }

  public onGoToPage(page: number) {
    this.goTo.emit(page);
  }

}
