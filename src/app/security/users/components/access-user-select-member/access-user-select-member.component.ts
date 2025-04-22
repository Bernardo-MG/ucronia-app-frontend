import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '@app/models/members/member';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { IconAddComponent } from '@bernardo-mg/icons';
import { BlockUiDirective, JustifyCenterDirective } from '@bernardo-mg/ui';
import { PaginatedResponse } from '@bernardo-mg/request';

@Component({
  selector: 'access-user-select-member',
  imports: [CommonModule, PaginationNavigationComponent, JustifyCenterDirective, BlockUiDirective, IconAddComponent],
  templateUrl: './access-user-select-member.component.html'
})
export class AccessUserSelectMemberComponent {

  @Input() public members = new PaginatedResponse<Member>();

  @Input() public waiting = false;

  @Output() public selectMember = new EventEmitter<Member>();

  @Output() public goToPage = new EventEmitter<number>();

  constructor() {
    this.onGoToPage(0);
  }

  public onSelect(data: Member): void {
    this.selectMember.emit(data);
  }

  public onGoToPage(page: number): void {
    this.goToPage.emit(page);
  }

}
