import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Privilege } from '@app/core/authentication/models/privilege';
import { PageInfo } from '@app/core/api/models/page-info';

@Component({
  selector: 'access-role-privilege-selection',
  templateUrl: './access-role-privilege-selection.component.html'
})
export class AccessRolePrivilegeSelectionComponent implements OnInit {

  @Input() public privileges: Privilege[] = [];

  @Input() public pageInfo = new PageInfo();

  @Output() public selectPrivilege = new EventEmitter<Privilege>();

  @Output() public goToPage = new EventEmitter<number>();

  public ngOnInit(): void {
    this.goToPage.emit(0);
  }

  public onSelect(privilege: Privilege) {
    this.selectPrivilege.emit(privilege);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

}
