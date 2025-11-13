
import { Component, input, output } from '@angular/core';
import { PublicMember } from '@app/domain/members/public-member';
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

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<PublicMember>>>((page: number) => EMPTY);
  public readonly getMember = input<(username: string) => Observable<PublicMember>>((username: string) => EMPTY);
  public readonly username = input('');
  public readonly member = input(new PublicMember());
  public readonly waitingMembersSelection = input(false);

  public readonly assignMember = output<PublicMember>();

  public view: 'member' | 'select' = 'member';

  public onShowSelectMember() {
    this.view = "select";
  }

  public onCancelSelectMember() {
    this.view = "member";
  }

  public onSelectMember(member: PublicMember): void {
    this.assignMember.emit(member);
    this.view = "member";
  }

}
