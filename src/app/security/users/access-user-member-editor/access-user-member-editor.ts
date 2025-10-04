
import { Component, input, output } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { EMPTY, Observable } from 'rxjs';
import { AccessUserSelectMember } from '../access-user-select-member/access-user-select-member';

@Component({
  selector: 'access-user-member-editor',
  imports: [ButtonModule, AccessUserSelectMember],
  templateUrl: './access-user-member-editor.html'
})
export class AccessUserMemberEditor {

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<Member>>>((page: number) => EMPTY);
  public readonly getMember = input<(username: string) => Observable<Member>>((username: string) => EMPTY);
  public readonly username = input('');
  public readonly member = input(new Member());
  public readonly waitingMembersSelection = input(false);

  public readonly assignMember = output<Member>();

  public view: 'member' | 'select' = 'member';

  public onShowSelectMember() {
    this.view = "select";
  }

  public onCancelSelectMember() {
    this.view = "member";
  }

  public onSelectMember(member: Member): void {
    this.assignMember.emit(member);
    this.view = "member";
  }

}
