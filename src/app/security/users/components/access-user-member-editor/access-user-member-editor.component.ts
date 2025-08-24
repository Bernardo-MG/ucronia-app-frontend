
import { Component, input, output } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { IconSearchComponent } from '@bernardo-mg/icons';
import { BlockUiDirective } from '@bernardo-mg/ui';
import { PaginatedResponse } from '@bernardo-mg/request';
import { AccessUserSelectMemberComponent } from '../access-user-select-member/access-user-select-member.component';

@Component({
  selector: 'access-user-member-editor',
  imports: [AccessUserSelectMemberComponent, IconSearchComponent, BlockUiDirective],
  templateUrl: './access-user-member-editor.component.html'
})
export class AccessUserMemberEditorComponent {

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
