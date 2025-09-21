
import { Component, input, output } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { IconSearchComponent } from '@bernardo-mg/icons';
import { BlockUiDirective } from '@bernardo-mg/ui';
import { PaginatedResponse } from '@bernardo-mg/request';
import { AccessUserSelectMember } from '../access-user-select-member/access-user-select-member';

@Component({
  selector: 'access-user-member-editor',
  imports: [AccessUserSelectMember, IconSearchComponent, BlockUiDirective],
  templateUrl: './access-user-member-editor.html'
})
export class AccessUserMemberEditor {

  readonly member = input('');

  readonly editable = input(false);

  readonly waiting = input(false);

  readonly waitingMembersSelection = input(false);

  public readonly membersSelection = input(new PaginatedResponse<Member>());

  public readonly goToSelectionPage = output<number>();

  public readonly selectMember = output<Member>();

  public view: 'member' | 'select' = 'member';

  public onShowSelectMember() {
    this.view = "select";
    this.onGoToSelectionPage(0);
  }

  public onCancelSelectMember() {
    this.view = "member";
  }

  public onSelectMember(member: Member): void {
    this.selectMember.emit(member);
    this.view = "member";
  }

  public onGoToSelectionPage(page: number): void {
    this.goToSelectionPage.emit(page);
  }

}
