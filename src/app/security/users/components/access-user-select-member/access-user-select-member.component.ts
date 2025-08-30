
import { Component, input, output } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { IconAddComponent } from '@bernardo-mg/icons';
import { BlockUiDirective, JustifyCenterDirective } from '@bernardo-mg/ui';
import { PaginatedResponse } from '@bernardo-mg/request';

@Component({
  selector: 'access-user-select-member',
  imports: [PaginationNavigationComponent, JustifyCenterDirective, BlockUiDirective, IconAddComponent],
  templateUrl: './access-user-select-member.component.html'
})
export class AccessUserSelectMemberComponent {

  public readonly members = input(new PaginatedResponse<Member>());

  public readonly waiting = input(false);

  public readonly selectMember = output<Member>();

  public readonly goToPage = output<number>();

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
