import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '@app/association/members/shared/models/member';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { IconsModule } from '@app/shared/icons/icons.module';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { AccessUserSelectMemberComponent } from '../access-user-select-member/access-user-select-member.component';

@Component({
  selector: 'access-user-member-editor',
  standalone: true,
  imports: [CommonModule, IconsModule, AccessUserSelectMemberComponent, BlockUiDirective],
  templateUrl: './access-user-member-editor.component.html'
})
export class AccessUserMemberEditorComponent {

  @Input() member = '';

  @Input() editable = false;

  @Input() waiting = false;

  @Input() waitingMembersSelection = false;

  @Input() public membersSelection = new PaginatedResponse<Member[]>([]);

  @Output() public goToSelectionPage = new EventEmitter<number>();

  @Output() public selectMember = new EventEmitter<Member>();

  public view: 'member' | 'select' = 'member';

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

  public onGoToSelectionPage(page: number): void {
    this.goToSelectionPage.emit(page);
  }

}
