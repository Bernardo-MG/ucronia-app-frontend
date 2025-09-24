
import { Component, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
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
export class AccessUserMemberEditor implements OnInit, OnChanges {

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<Member>>>((page: number) => EMPTY);
  public readonly getMember = input<(username: string) => Observable<Member>>((username: string) => EMPTY);
  public readonly username = input('');
  public readonly waitingMembersSelection = input(false);

  public readonly selectMember = output<Member>();

  public view: 'member' | 'select' = 'member';

  public member = new Member();

  public ngOnInit(): void {
    this.getMember()(this.username()).subscribe(response => this.member = response);
  }

  public ngOnChanges({ username }: SimpleChanges): void {
    if (username) {
      this.getMember()(this.username()).subscribe(response => this.member = response);
    }
  }

  public onShowSelectMember() {
    this.view = "select";
  }

  public onCancelSelectMember() {
    this.view = "member";
  }

  public onSelectMember(member: Member): void {
    this.selectMember.emit(member);
    this.view = "member";
  }

}
