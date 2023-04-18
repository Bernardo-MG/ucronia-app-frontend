import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Role } from '@app/core/authentication/models/role';
import { PageInfo } from '@app/shared/utils/api/models/page-info';

@Component({
  selector: 'access-user-role-selection',
  templateUrl: './access-user-role-selection.component.html',
  styleUrls: ['./access-user-role-selection.component.sass']
})
export class AccessUserRoleSelectionComponent implements OnInit {

  @Input() public roles: Role[] = [];

  @Input() public pageInfo = new PageInfo();

  @Output() public selectRole = new EventEmitter<Role>();

  @Output() public goToPage = new EventEmitter<number>();

  public ngOnInit(): void {
    this.goToPage.emit(0);
  }

  public onSelect(role: Role) {
    this.selectRole.emit(role);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

}
