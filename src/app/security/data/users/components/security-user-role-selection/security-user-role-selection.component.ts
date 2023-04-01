import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageInfo } from '@app/api/models/page-info';
import { Role } from '@app/core/models/role';

@Component({
  selector: 'security-user-role-selection',
  templateUrl: './security-user-role-selection.component.html',
  styleUrls: ['./security-user-role-selection.component.sass']
})
export class SecurityUserRoleSelectionComponent implements OnInit {

  @Input() public roles: Role[] = [];

  @Input() public pageInfo = new PageInfo();

  @Output() public selectRole = new EventEmitter<Role>();

  @Output() public goToPage = new EventEmitter<number>();

  constructor() { }

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
