import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageInfo } from '@app/api/models/page-info';
import { Privilege } from '@app/core/models/privilege';

@Component({
  selector: 'security-role-privilege-selection',
  templateUrl: './security-role-privilege-selection.component.html',
  styleUrls: ['./security-role-privilege-selection.component.sass']
})
export class SecurityRolePrivilegeSelectionComponent implements OnInit {

  @Input() public privileges: Privilege[] = [];

  @Input() public pageInfo = new PageInfo();

  @Output() public selectPrivilege = new EventEmitter<Privilege>();

  @Output() public goToPage = new EventEmitter<number>();

  constructor() { }

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
