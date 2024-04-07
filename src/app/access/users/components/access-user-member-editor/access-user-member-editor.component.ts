import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AccessUserSelectMemberComponent } from '../access-user-select-member/access-user-select-member.component';

@Component({
  selector: 'access-user-member-editor',
  standalone: true,
  imports: [CommonModule, AccessUserSelectMemberComponent],
  templateUrl: './access-user-member-editor.component.html'
})
export class AccessUserMemberEditorComponent {

  @Input() member = '';

  @Input() editable = false;

  public view: 'member' | 'select' = 'member';

  public onShowSelectMember() {
    this.view = "select";
  }

  public onCancelSelectMember() {
    this.view = "member";
  }

}
