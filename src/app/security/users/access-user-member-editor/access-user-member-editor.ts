
import { Component, input, output } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { IconSearchComponent } from '@bernardo-mg/icons';
import { PaginatedResponse } from '@bernardo-mg/request';
import { EMPTY, Observable } from 'rxjs';
import { AccessUserSelectMember } from '../access-user-select-member/access-user-select-member';

@Component({
  selector: 'access-user-member-editor',
  imports: [AccessUserSelectMember, IconSearchComponent],
  templateUrl: './access-user-member-editor.html'
})
export class AccessUserMemberEditor {

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<Member>>>((page: number) => EMPTY);
  public readonly member = input('');
  public readonly waitingMembersSelection = input(false);
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
